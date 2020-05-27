<template>
    <div class="app-container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
            <el-form-item label="自增主键" prop="id">
                <el-input v-model="queryParams.id" placeholder="请输入自增主键" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="反馈人员 id" prop="memberId">
                <el-input v-model="queryParams.memberId" placeholder="请输入反馈人员 id" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="昵称" prop="memberName">
                <el-input v-model="queryParams.memberName" placeholder="请输入昵称" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['feedback:feedback:add']"
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['feedback:feedback:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['feedback:feedback:remove']"
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                >删除</el-button>
            </el-col>
        </el-row>

        <el-table v-loading="loading" :data="feedbackList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" /><el-table-column label="自增主键" align="center" prop="id" :show-overflow-tooltip="true" /><el-table-column label="昵称" align="center" prop="memberName" :show-overflow-tooltip="true" /><el-table-column label="联系电话" align="center" prop="memberPhone" :show-overflow-tooltip="true" /><el-table-column label="反馈类型 1 投诉，2 建议" align="center" prop="feedType" :show-overflow-tooltip="true" /><el-table-column label="反馈明细" align="center" prop="feedDesc" :show-overflow-tooltip="true" /><el-table-column label="反馈图片地址" align="center" prop="img" :show-overflow-tooltip="true" />
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                            v-permisaction="['feedback:feedback:edit']"
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row)"
                    >修改</el-button>
                    <el-button
                            v-permisaction="['feedback:feedback:remove']"
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
                <el-form-item label="自增主键" prop="id">
                    <el-input v-model="form.id" placeholder="自增主键" type="number" />
                </el-form-item>
                <el-form-item label="反馈人员 id" prop="memberId">
                    <el-input v-model="form.memberId" placeholder="反馈人员 id" type="number" />
                </el-form-item>
                <el-form-item label="昵称" prop="memberName">
                    <el-input v-model="form.memberName" placeholder="昵称" />
                </el-form-item>
                <el-form-item label="联系电话" prop="memberPhone">
                    <el-input v-model="form.memberPhone" placeholder="联系电话" />
                </el-form-item>
                <el-form-item label="处理人id" prop="userId">
                    <el-input v-model="form.userId" placeholder="处理人id" />
                </el-form-item>
                <el-form-item label="反馈类型 1 投诉，2 建议" prop="feedType">
                    <el-input v-model="form.feedType" placeholder="反馈类型 1 投诉，2 建议" type="number" />
                </el-form-item>
                <el-form-item label="反馈明细" prop="feedDesc">
                    <el-input v-model="form.feedDesc" placeholder="反馈明细" />
                </el-form-item>
                <el-form-item label="反馈图片地址" prop="img">
                    <el-input v-model="form.img" placeholder="反馈图片地址" />
                </el-form-item>
                <el-form-item label="" prop="img1">
                    <el-input v-model="form.img1" placeholder="" />
                </el-form-item>
                <el-form-item label="" prop="img2">
                    <el-input v-model="form.img2" placeholder="" />
                </el-form-item>
                <el-form-item label="" prop="img3">
                    <el-input v-model="form.img3" placeholder="" />
                </el-form-item>
                <el-form-item label="反馈时间" prop="feedTime">
                    <el-input v-model="form.feedTime" placeholder="反馈时间" />
                </el-form-item>
                <el-form-item label="0 删除 1 待处理  5 处理中  10 已完结" prop="feedStatus">
                    <el-input v-model="form.feedStatus" placeholder="0 删除 1 待处理  5 处理中  10 已完结" type="number" />
                </el-form-item>
                <el-form-item label="问题小结" prop="feedBack">
                    <el-input v-model="form.feedBack" placeholder="问题小结" />
                </el-form-item>
                <el-form-item label="更新时间" prop="updateTime">
                    <el-input v-model="form.updateTime" placeholder="更新时间" />
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
import { listFeedBack, getFeedBack, delFeedBack, addFeedBack, updateFeedBack } from '@/api/feedback'

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
                    pageSize: 10,id: undefined,memberId: undefined,memberName: undefined,
                },
                // 表单参数
                form: {},
                // 表单校验
                rules: {
                    id: [
                        { required: true, message: '自增主键不能为空', trigger: 'blur' }
                    ],
                    memberId: [
                        { required: true, message: '反馈人员 id不能为空', trigger: 'blur' }
                    ],
                    memberName: [
                        { required: true, message: '昵称不能为空', trigger: 'blur' }
                    ],
                },
                feedbackList:[]
            }
        },
        created() {
            this.getList()
        },
        methods: {
            /** 查询参数列表 */
            getList() {
                this.loading = true
                listFeedBack(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.feedbackList = response.data.list
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
                    id: undefined,
                    memberId: undefined,
                    memberName: undefined,
                    memberPhone: undefined,
                    userId: undefined,
                    feedType: undefined,
                    feedDesc: undefined,
                    img: undefined,
                    img1: undefined,
                    img2: undefined,
                    img3: undefined,
                    feedTime: undefined,
                    feedStatus: undefined,
                    feedBack: undefined,
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
                this.title = '添加FeedBack'
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.id)
                this.single = selection.length !== 1
                this.multiple = !selection.length
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset()
                const id = row.id || this.ids
                getFeedBack(id).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '修改FeedBack'
                })
            },
            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.id !== undefined) {
                            updateFeedBack(this.form).then(response => {
                                if (response.code === 0) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addFeedBack(this.form).then(response => {
                                if (response.code === 0) {
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
                const Ids = row.id || this.ids
                this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function() {
                    return delFeedBack(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>