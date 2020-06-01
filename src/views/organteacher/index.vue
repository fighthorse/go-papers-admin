<template>
    <div class="app-container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
            <el-form-item label="" prop="teacherId">
                <el-input v-model="queryParams.teacherId" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="教师姓名" prop="teacherName">
                <el-input v-model="queryParams.teacherName" placeholder="请输入教师姓名" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="" prop="organName">
                <el-input v-model="queryParams.organName" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="" prop="brandName">
                <el-input v-model="queryParams.brandName" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="工作经历" prop="workInfo">
                <el-input v-model="queryParams.workInfo" placeholder="请输入工作经历" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="" prop="createBy">
                <el-input v-model="queryParams.createBy" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="" prop="updateBy">
                <el-input v-model="queryParams.updateBy" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="核准状态 1 待审核  3 失败 5 已通过" prop="approvalStatus">
                <el-input v-model="queryParams.approvalStatus" placeholder="请输入核准状态 1 待审核  3 失败 5 已通过" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="核准时间" prop="approvalAt">
                <el-input v-model="queryParams.approvalAt" placeholder="请输入核准时间" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="核准人id" prop="approvalUserId">
                <el-input v-model="queryParams.approvalUserId" placeholder="请输入核准人id" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="核准人名称" prop="approvalUserName">
                <el-input v-model="queryParams.approvalUserName" placeholder="请输入核准人名称" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['organteacher:organteacher:add']"
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['organteacher:organteacher:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['organteacher:organteacher:remove']"
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                >删除</el-button>
            </el-col>
        </el-row>

        <el-table v-loading="loading" :data="organteacherList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" /><el-table-column label="" align="center" prop="teacherId" :show-overflow-tooltip="true" /><el-table-column label="教师姓名" align="center" prop="teacherName" :show-overflow-tooltip="true" /><el-table-column label="" align="center" prop="organName" :show-overflow-tooltip="true" /><el-table-column label="" align="center" prop="brandName" :show-overflow-tooltip="true" /><el-table-column label="核准状态 1 待审核  3 失败 5 已通过" align="center" prop="approvalStatus" :show-overflow-tooltip="true" /><el-table-column label="核准时间" align="center" prop="approvalAt" :show-overflow-tooltip="true" /><el-table-column label="核准人名称" align="center" prop="approvalUserName" :show-overflow-tooltip="true" />
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                            v-permisaction="['organteacher:organteacher:edit']"
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row)"
                    >修改</el-button>
                    <el-button
                            v-permisaction="['organteacher:organteacher:remove']"
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
                <el-form-item label="" prop="teacherId">
                    <el-input v-model="form.teacherId" placeholder="" />
                </el-form-item>
                <el-form-item label="教师姓名" prop="teacherName">
                    <el-input v-model="form.teacherName" placeholder="教师姓名" />
                </el-form-item>
                <el-form-item label="入职时间" prop="treacherRegister">
                    <el-input v-model="form.treacherRegister" placeholder="入职时间" />
                </el-form-item>
                <el-form-item label="" prop="organId">
                    <el-input v-model="form.organId" placeholder="" />
                </el-form-item>
                <el-form-item label="" prop="organName">
                    <el-input v-model="form.organName" placeholder="" />
                </el-form-item>
                <el-form-item label="" prop="brandName">
                    <el-input v-model="form.brandName" placeholder="" />
                </el-form-item>
                <el-form-item label="工作经历" prop="workInfo">
                    <el-input v-model="form.workInfo" placeholder="工作经历" />
                </el-form-item>
                <el-form-item label="教师资格证书 图片" prop="teacherQualify">
                    <el-input v-model="form.teacherQualify" placeholder="教师资格证书 图片" />
                </el-form-item>
                <el-form-item label="工作背景及业绩" prop="workBg">
                    <el-input v-model="form.workBg" placeholder="工作背景及业绩" />
                </el-form-item>
                <el-form-item label="证明材料 图片" prop="workVerify">
                    <el-input v-model="form.workVerify" placeholder="证明材料 图片" />
                </el-form-item>
                <el-form-item label="" prop="createBy">
                    <el-input v-model="form.createBy" placeholder="" />
                </el-form-item>
                <el-form-item label="" prop="updateBy">
                    <el-input v-model="form.updateBy" placeholder="" />
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
                <el-form-item label="核准状态 1 待审核  3 失败 5 已通过" prop="approvalStatus">
                    <el-input v-model="form.approvalStatus" placeholder="核准状态 1 待审核  3 失败 5 已通过" />
                </el-form-item>
                <el-form-item label="核准时间" prop="approvalAt">
                    <el-input v-model="form.approvalAt" placeholder="核准时间" />
                </el-form-item>
                <el-form-item label="核准人id" prop="approvalUserId">
                    <el-input v-model="form.approvalUserId" placeholder="核准人id" />
                </el-form-item>
                <el-form-item label="核准人名称" prop="approvalUserName">
                    <el-input v-model="form.approvalUserName" placeholder="核准人名称" />
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
    import { listOrganTeacher, getOrganTeacher, delOrganTeacher, addOrganTeacher, updateOrganTeacher } from '@/api/organteacher'

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
                    pageSize: 10,teacherId: undefined,teacherName: undefined,organName: undefined,brandName: undefined,workInfo: undefined,createBy: undefined,updateBy: undefined,approvalStatus: undefined,approvalAt: undefined,approvalUserId: undefined,approvalUserName: undefined,
                },
                // 表单参数
                form: {},
                // 表单校验
                rules: {teacherId: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    teacherName: [
                        { required: true, message: '教师姓名不能为空', trigger: 'blur' }
                    ],
                    organName: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    brandName: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    workInfo: [
                        { required: true, message: '工作经历不能为空', trigger: 'blur' }
                    ],
                    createBy: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    updateBy: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    approvalStatus: [
                        { required: true, message: '核准状态 1 待审核  3 失败 5 已通过不能为空', trigger: 'blur' }
                    ],
                    approvalAt: [
                        { required: true, message: '核准时间不能为空', trigger: 'blur' }
                    ],
                    approvalUserId: [
                        { required: true, message: '核准人id不能为空', trigger: 'blur' }
                    ],
                    approvalUserName: [
                        { required: true, message: '核准人名称不能为空', trigger: 'blur' }
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
                listOrganTeacher(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.organteacherList = response.data.list
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
                    teacherId: undefined,
                    teacherName: undefined,
                    treacherRegister: undefined,
                    organId: undefined,
                    organName: undefined,
                    brandName: undefined,
                    workInfo: undefined,
                    teacherQualify: undefined,
                    workBg: undefined,
                    workVerify: undefined,
                    createBy: undefined,
                    updateBy: undefined,
                    createdAt: undefined,
                    updatedAt: undefined,
                    deletedAt: undefined,
                    approvalStatus: undefined,
                    approvalAt: undefined,
                    approvalUserId: undefined,
                    approvalUserName: undefined,
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
                this.title = '添加机构老师信息表'
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.teacherId)
                this.single = selection.length !== 1
                this.multiple = !selection.length
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset()
                const teacherId = row.teacherId || this.ids
                getOrganTeacher(teacherId).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '修改机构老师信息表'
                })
            },
            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.teacherId !== undefined) {
                            updateOrganTeacher(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addOrganTeacher(this.form).then(response => {
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
                const Ids = row.teacherId || this.ids
                this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function() {
                    return delOrganTeacher(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>