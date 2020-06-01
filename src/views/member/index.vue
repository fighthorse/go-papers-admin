<template>
    <div class="app-container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">

            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['member:member:add']"
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['member:member:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['member:member:remove']"
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                >删除</el-button>
            </el-col>
        </el-row>

        <el-table v-loading="loading" :data="memberList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                            v-permisaction="['member:member:edit']"
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row)"
                    >修改</el-button>
                    <el-button
                            v-permisaction="['member:member:remove']"
                            size="mini"
                            type="text"
                            icon="el-icon-delete"
                            @click="handleDelete(scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination
                v-show="total>0"
                :total="total"
                :page.sync="queryParams.pageIndex"
                :limit.sync="queryParams.pageSize"
                @pagination="getList"
        />

        <!-- 添加或修改参数配置对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="" prop="memberId">
                    <el-input v-model="form.memberId" placeholder="" />
                </el-form-item>
                <el-form-item label="昵称" prop="nickName">
                    <el-input v-model="form.nickName" placeholder="昵称" />
                </el-form-item>
                <el-form-item label="账户 登录账号" prop="accountName">
                    <el-input v-model="form.accountName" placeholder="账户 登录账号" />
                </el-form-item>
                <el-form-item label="头像地址" prop="cover">
                    <el-input v-model="form.cover" placeholder="头像地址" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" placeholder="密码" />
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="form.phone" placeholder="手机号" />
                </el-form-item>
                <el-form-item label="身份证号" prop="cardNo">
                    <el-input v-model="form.cardNo" placeholder="身份证号" />
                </el-form-item>
                <el-form-item label="" prop="province">
                    <el-input v-model="form.province" placeholder="" />
                </el-form-item>
                <el-form-item label="" prop="city">
                    <el-input v-model="form.city" placeholder="" />
                </el-form-item>
                <el-form-item label="" prop="area">
                    <el-input v-model="form.area" placeholder="" />
                </el-form-item>
                <el-form-item label="" prop="address">
                    <el-input v-model="form.address" placeholder="" />
                </el-form-item>
                <el-form-item label="是否管家妈妈 是 1" prop="isMom">
                    <el-input v-model="form.isMom" placeholder="是否管家妈妈 是 1" />
                </el-form-item>
                <el-form-item label="微信openid" prop="wxOpenid">
                    <el-input v-model="form.wxOpenid" placeholder="微信openid" />
                </el-form-item>
                <el-form-item label="" prop="wxUnionid">
                    <el-input v-model="form.wxUnionid" placeholder="" />
                </el-form-item>
                <el-form-item label="" prop="registerTime">
                    <el-input v-model="form.registerTime" placeholder="" />
                </el-form-item>
                <el-form-item label="" prop="activeTime">
                    <el-input v-model="form.activeTime" placeholder="" />
                </el-form-item>
                <el-form-item label="" prop="updateTime">
                    <el-input v-model="form.updateTime" placeholder="" />
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { listMember, getMember, delMember, addMember, updateMember } from '@/api/member'

    export default {
        name: 'Config',
        data() {
            return {
                // 遮罩层
                loading: true,
                // 选中数组
                ids: [],
                // 非单个禁用
                single: true,
                // 非多个禁用
                multiple: true,
                // 总条数
                total: 0,
                // 参数表格数据
                configList: [],
                // 弹出层标题
                title: '',
                // 是否显示弹出层
                open: false,
                // 类型数据字典
                typeOptions: [],
                // 日期范围
                dateRange: [],
                // 查询参数
                queryParams: {
                    pageIndex: 1,
                    pageSize: 10,
                },
                // 表单参数
                form: {},
                // 表单校验
                rules: {}
            }
        },
        created() {
            this.getList()
        },
        methods: {
            /** 查询参数列表 */
            getList() {
                this.loading = true
                listMember(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.memberList = response.data.list
                        this.total = response.data.count
                        this.loading = false
                    }
                )
            },
            // 取消按钮
            cancel() {
                this.open = false
                this.reset()
            },
            // 表单重置
            reset() {
                this.form = {
                    memberId: undefined,
                    nickName: undefined,
                    accountName: undefined,
                    cover: undefined,
                    password: undefined,
                    phone: undefined,
                    cardNo: undefined,
                    province: undefined,
                    city: undefined,
                    area: undefined,
                    address: undefined,
                    isMom: undefined,
                    wxOpenid: undefined,
                    wxUnionid: undefined,
                    registerTime: undefined,
                    activeTime: undefined,
                    updateTime: undefined,
                }
                this.resetForm('form')
            },
            /** 搜索按钮操作 */
            handleQuery() {
                this.queryParams.pageIndex = 1
                this.getList()
            },
            /** 重置按钮操作 */
            resetQuery() {
                this.dateRange = []
                this.resetForm('queryForm')
                this.handleQuery()
            },
            /** 新增按钮操作 */
            handleAdd() {
                this.reset()
                this.open = true
                this.title = '添加Member'
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.memberId)
                this.single = selection.length !== 1
                this.multiple = !selection.length
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset()
                const memberId = row.memberId || this.ids
                getMember(memberId).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '修改Member'
                })
            },
            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.memberId !== undefined) {
                            updateMember(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addMember(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('新增成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        }
                    }
                })
            },
            /** 删除按钮操作 */
            handleDelete(row) {
                const Ids = row.memberId || this.ids
                this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function() {
                    return delMember(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>