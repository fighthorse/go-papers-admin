<template>
    <div class="app-container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
            <el-form-item label="" prop="specialId">
                <el-input v-model="queryParams.specialId" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="专题编号" prop="specialCode">
                <el-input v-model="queryParams.specialCode" placeholder="请输入专题编号" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="专题名称" prop="specialName">
                <el-input v-model="queryParams.specialName" placeholder="请输入专题名称" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="状态 1 进行中 草稿  ，  5 发布 展示中 ， 10 已下线" prop="specialStatus">
                <el-input v-model="queryParams.specialStatus" placeholder="请输入状态 1 进行中 草稿  ，  5 发布 展示中 ， 10 已下线" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="banner图片地址" prop="specialBanner">
                <el-input v-model="queryParams.specialBanner" placeholder="请输入banner图片地址" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="有效日期 起始" prop="specialStart">
                <el-input v-model="queryParams.specialStart" placeholder="请输入有效日期 起始" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="有效日期 结束" prop="specialEnd">
                <el-input v-model="queryParams.specialEnd" placeholder="请输入有效日期 结束" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="创建人" prop="createBy">
                <el-input v-model="queryParams.createBy" placeholder="请输入创建人" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="修改人" prop="updateBy">
                <el-input v-model="queryParams.updateBy" placeholder="请输入修改人" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['specialcontent:specialcontent:add']"
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['specialcontent:specialcontent:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['specialcontent:specialcontent:remove']"
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                >删除</el-button>
            </el-col>
        </el-row>

        <el-table v-loading="loading" :data="specialcontentList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" /><el-table-column label="" align="center" prop="specialId" :show-overflow-tooltip="true" /><el-table-column label="专题编号" align="center" prop="specialCode" :show-overflow-tooltip="true" /><el-table-column label="专题名称" align="center" prop="specialName" :show-overflow-tooltip="true" /><el-table-column label="描述" align="center" prop="specialDesc" :show-overflow-tooltip="true" /><el-table-column label="权重 默认 100" align="center" prop="specialSort" :show-overflow-tooltip="true" /><el-table-column label="状态 1 进行中 草稿  ，  5 发布 展示中 ， 10 已下线" align="center" prop="specialStatus" :show-overflow-tooltip="true" /><el-table-column label="banner图片地址" align="center" prop="specialBanner" :show-overflow-tooltip="true" /><el-table-column label="有效日期 起始" align="center" prop="specialStart" :show-overflow-tooltip="true" /><el-table-column label="有效日期 结束" align="center" prop="specialEnd" :show-overflow-tooltip="true" /><el-table-column label="头图片" align="center" prop="specialTop" :show-overflow-tooltip="true" /><el-table-column label="商品信息 json" align="center" prop="specialGoods" :show-overflow-tooltip="true" /><el-table-column label="底部 规则说明 图片" align="center" prop="specialBottom" :show-overflow-tooltip="true" /><el-table-column label="创建人" align="center" prop="createBy" :show-overflow-tooltip="true" /><el-table-column label="修改人" align="center" prop="updateBy" :show-overflow-tooltip="true" /><el-table-column label="" align="center" prop="createdAt" :show-overflow-tooltip="true" /><el-table-column label="" align="center" prop="updatedAt" :show-overflow-tooltip="true" />
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                            v-permisaction="['specialcontent:specialcontent:edit']"
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row)"
                    >修改</el-button>
                    <el-button
                            v-permisaction="['specialcontent:specialcontent:remove']"
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
                <el-form-item label="" prop="specialId">
                    <el-input v-model="form.specialId" placeholder="" />
                </el-form-item>
                <el-form-item label="专题编号" prop="specialCode">
                    <el-input v-model="form.specialCode" placeholder="专题编号" />
                </el-form-item>
                <el-form-item label="专题名称" prop="specialName">
                    <el-input v-model="form.specialName" placeholder="专题名称" />
                </el-form-item>
                <el-form-item label="描述" prop="specialDesc">
                    <el-input v-model="form.specialDesc" placeholder="描述" />
                </el-form-item>
                <el-form-item label="权重 默认 100" prop="specialSort">
                    <el-input v-model="form.specialSort" placeholder="权重 默认 100" />
                </el-form-item>
                <el-form-item label="状态 1 进行中 草稿  ，  5 发布 展示中 ， 10 已下线" prop="specialStatus">
                    <el-input v-model="form.specialStatus" placeholder="状态 1 进行中 草稿  ，  5 发布 展示中 ， 10 已下线" />
                </el-form-item>
                <el-form-item label="banner图片地址" prop="specialBanner">
                    <el-input v-model="form.specialBanner" placeholder="banner图片地址" />
                </el-form-item>
                <el-form-item label="有效日期 起始" prop="specialStart">
                    <el-input v-model="form.specialStart" placeholder="有效日期 起始" />
                </el-form-item>
                <el-form-item label="有效日期 结束" prop="specialEnd">
                    <el-input v-model="form.specialEnd" placeholder="有效日期 结束" />
                </el-form-item>
                <el-form-item label="头图片" prop="specialTop">
                    <el-input v-model="form.specialTop" placeholder="头图片" />
                </el-form-item>
                <el-form-item label="商品信息 json" prop="specialGoods">
                    <el-input v-model="form.specialGoods" placeholder="商品信息 json" />
                </el-form-item>
                <el-form-item label="底部 规则说明 图片" prop="specialBottom">
                    <el-input v-model="form.specialBottom" placeholder="底部 规则说明 图片" />
                </el-form-item>
                <el-form-item label="创建人" prop="createBy">
                    <el-input v-model="form.createBy" placeholder="创建人" />
                </el-form-item>
                <el-form-item label="修改人" prop="updateBy">
                    <el-input v-model="form.updateBy" placeholder="修改人" />
                </el-form-item>
                <el-form-item label="" prop="createdAt">
                    <el-input v-model="form.createdAt" placeholder="" />
                </el-form-item>
                <el-form-item label="" prop="updatedAt">
                    <el-input v-model="form.updatedAt" placeholder="" />
                </el-form-item>
                <el-form-item label="" prop="deletedAt">
                    <el-input v-model="form.deletedAt" placeholder="" />
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
    import { listSpecialContent, getSpecialContent, delSpecialContent, addSpecialContent, updateSpecialContent } from '@/api/specialcontent'

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
                    pageSize: 10,specialId: undefined,specialCode: undefined,specialName: undefined,specialStatus: undefined,specialBanner: undefined,specialStart: undefined,specialEnd: undefined,createBy: undefined,updateBy: undefined,
                },
                // 表单参数
                form: {},
                // 表单校验
                rules: {specialId: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    specialCode: [
                        { required: true, message: '专题编号不能为空', trigger: 'blur' }
                    ],
                    specialName: [
                        { required: true, message: '专题名称不能为空', trigger: 'blur' }
                    ],
                    specialStatus: [
                        { required: true, message: '状态 1 进行中 草稿  ，  5 发布 展示中 ， 10 已下线不能为空', trigger: 'blur' }
                    ],
                    specialBanner: [
                        { required: true, message: 'banner图片地址不能为空', trigger: 'blur' }
                    ],
                    specialStart: [
                        { required: true, message: '有效日期 起始不能为空', trigger: 'blur' }
                    ],
                    specialEnd: [
                        { required: true, message: '有效日期 结束不能为空', trigger: 'blur' }
                    ],
                    createBy: [
                        { required: true, message: '创建人不能为空', trigger: 'blur' }
                    ],
                    updateBy: [
                        { required: true, message: '修改人不能为空', trigger: 'blur' }
                    ],
                }
            }
        },
        created() {
            this.getList()
        },
        methods: {
            /** 查询参数列表 */
            getList() {
                this.loading = true
                listSpecialContent(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.specialcontentList = response.data.list
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
                    specialId: undefined,
                    specialCode: undefined,
                    specialName: undefined,
                    specialDesc: undefined,
                    specialSort: undefined,
                    specialStatus: undefined,
                    specialBanner: undefined,
                    specialStart: undefined,
                    specialEnd: undefined,
                    specialTop: undefined,
                    specialGoods: undefined,
                    specialBottom: undefined,
                    createBy: undefined,
                    updateBy: undefined,
                    createdAt: undefined,
                    updatedAt: undefined,
                    deletedAt: undefined,
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
                this.title = '添加专题管理'
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.specialId)
                this.single = selection.length !== 1
                this.multiple = !selection.length
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset()
                const specialId = row.specialId || this.ids
                getSpecialContent(specialId).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '修改专题管理'
                })
            },
            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.specialId !== undefined) {
                            updateSpecialContent(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addSpecialContent(this.form).then(response => {
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
                const Ids = row.specialId || this.ids
                this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function() {
                    return delSpecialContent(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>