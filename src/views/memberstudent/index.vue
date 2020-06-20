<template>
    <div class="app-container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
            <el-form-item label="" prop="studentId">
                <el-input v-model="queryParams.studentId" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="会员id" prop="memberId">
                <el-input v-model="queryParams.memberId" placeholder="请输入会员id" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="姓名" prop="studentName">
                <el-input v-model="queryParams.studentName" placeholder="请输入姓名" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="出生年月" prop="studentDay">
                <el-input v-model="queryParams.studentDay" placeholder="请输入出生年月" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="年龄" prop="studentAge">
                <el-input v-model="queryParams.studentAge" placeholder="请输入年龄" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="手机" prop="studentPhone">
                <el-input v-model="queryParams.studentPhone" placeholder="请输入手机" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="年级" prop="studentGrade">
                <el-input v-model="queryParams.studentGrade" placeholder="请输入年级" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="省份" prop="province">
                <el-input v-model="queryParams.province" placeholder="请输入省份" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="城市" prop="city">
                <el-input v-model="queryParams.city" placeholder="请输入城市" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="区域" prop="area">
                <el-input v-model="queryParams.area" placeholder="请输入区域" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="queryParams.address" placeholder="请输入地址" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['memberstudent:memberstudent:add']"
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['memberstudent:memberstudent:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['memberstudent:memberstudent:remove']"
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                >删除</el-button>
            </el-col>
        </el-row>

        <el-table v-loading="loading" :data="memberstudentList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" /><el-table-column label="" align="center" prop="studentId" :show-overflow-tooltip="true" /><el-table-column label="会员id" align="center" prop="memberId" :show-overflow-tooltip="true" /><el-table-column label="姓名" align="center" prop="studentName" :show-overflow-tooltip="true" /><el-table-column label="出生年月" align="center" prop="studentDay" :show-overflow-tooltip="true" /><el-table-column label="年龄" align="center" prop="studentAge" :show-overflow-tooltip="true" /><el-table-column label="手机" align="center" prop="studentPhone" :show-overflow-tooltip="true" /><el-table-column label="年级" align="center" prop="studentGrade" :show-overflow-tooltip="true" /><el-table-column label="省份" align="center" prop="province" :show-overflow-tooltip="true" /><el-table-column label="城市" align="center" prop="city" :show-overflow-tooltip="true" /><el-table-column label="区域" align="center" prop="area" :show-overflow-tooltip="true" /><el-table-column label="地址" align="center" prop="address" :show-overflow-tooltip="true" />
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                            v-permisaction="['memberstudent:memberstudent:edit']"
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row)"
                    >修改</el-button>
                    <el-button
                            v-permisaction="['memberstudent:memberstudent:remove']"
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
                <el-form-item label="" prop="studentId">
                    <el-input v-model="form.studentId" placeholder="" />
                </el-form-item>
                <el-form-item label="会员id" prop="memberId">
                    <el-input v-model="form.memberId" placeholder="会员id" />
                </el-form-item>
                <el-form-item label="姓名" prop="studentName">
                    <el-input v-model="form.studentName" placeholder="姓名" />
                </el-form-item>
                <el-form-item label="出生年月" prop="studentDay">
                    <el-input v-model="form.studentDay" placeholder="出生年月" />
                </el-form-item>
                <el-form-item label="年龄" prop="studentAge">
                    <el-input v-model="form.studentAge" placeholder="年龄" />
                </el-form-item>
                <el-form-item label="手机" prop="studentPhone">
                    <el-input v-model="form.studentPhone" placeholder="手机" />
                </el-form-item>
                <el-form-item label="年级" prop="studentGrade">
                    <el-input v-model="form.studentGrade" placeholder="年级" />
                </el-form-item>
                <el-form-item label="省份" prop="province">
                    <el-input v-model="form.province" placeholder="省份" />
                </el-form-item>
                <el-form-item label="城市" prop="city">
                    <el-input v-model="form.city" placeholder="城市" />
                </el-form-item>
                <el-form-item label="区域" prop="area">
                    <el-input v-model="form.area" placeholder="区域" />
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="form.address" placeholder="地址" />
                </el-form-item>
                <el-form-item label="创建" prop="createBy">
                    <el-input v-model="form.createBy" placeholder="创建" />
                </el-form-item>
                <el-form-item label="跟新" prop="updateBy">
                    <el-input v-model="form.updateBy" placeholder="跟新" />
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
    import { listMemberStudent, getMemberStudent, delMemberStudent, addMemberStudent, updateMemberStudent } from '@/api/memberstudent'

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
                    pageSize: 10,studentId: undefined,memberId: undefined,studentName: undefined,studentDay: undefined,studentAge: undefined,studentPhone: undefined,studentGrade: undefined,province: undefined,city: undefined,area: undefined,address: undefined,
                },
                // 表单参数
                form: {},
                // 表单校验
                rules: {studentId: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    memberId: [
                        { required: true, message: '会员id不能为空', trigger: 'blur' }
                    ],
                    studentName: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    studentDay: [
                        { required: true, message: '出生年月不能为空', trigger: 'blur' }
                    ],
                    studentAge: [
                        { required: true, message: '年龄不能为空', trigger: 'blur' }
                    ],
                    studentPhone: [
                        { required: true, message: '手机不能为空', trigger: 'blur' }
                    ],
                    studentGrade: [
                        { required: true, message: '年级不能为空', trigger: 'blur' }
                    ],
                    province: [
                        { required: true, message: '省份不能为空', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '城市不能为空', trigger: 'blur' }
                    ],
                    area: [
                        { required: true, message: '区域不能为空', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '地址不能为空', trigger: 'blur' }
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
                listMemberStudent(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.memberstudentList = response.data.list
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
                    studentId: undefined,
                    memberId: undefined,
                    studentName: undefined,
                    studentDay: undefined,
                    studentAge: undefined,
                    studentPhone: undefined,
                    studentGrade: undefined,
                    province: undefined,
                    city: undefined,
                    area: undefined,
                    address: undefined,
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
                this.title = '添加会员-学生关系'
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.studentId)
                this.single = selection.length !== 1
                this.multiple = !selection.length
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset()
                const studentId = row.studentId || this.ids
                getMemberStudent(studentId).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '修改会员-学生关系'
                })
            },
            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.studentId !== undefined) {
                            updateMemberStudent(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addMemberStudent(this.form).then(response => {
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
                const Ids = row.studentId || this.ids
                this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function() {
                    return delMemberStudent(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>