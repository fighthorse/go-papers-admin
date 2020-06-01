<template>
    <div class="app-container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
            <el-form-item label="" prop="courseId">
                <el-input v-model="queryParams.courseId" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="课程名称" prop="courseName">
                <el-input v-model="queryParams.courseName" placeholder="请输入课程名称" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="核准状态 1 待审核 ，3 失败 ， 5 已审核" prop="courseStatus">
                <el-input v-model="queryParams.courseStatus" placeholder="请输入核准状态 1 待审核 ，3 失败 ， 5 已审核" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="课程类目" prop="courseType">
                <el-input v-model="queryParams.courseType" placeholder="请输入课程类目" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="学科科目" prop="courseCategory">
                <el-input v-model="queryParams.courseCategory" placeholder="请输入学科科目" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="授课机构" prop="organId">
                <el-input v-model="queryParams.organId" placeholder="请输入授课机构" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="" prop="organName">
                <el-input v-model="queryParams.organName" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="授课方式 ：线上 、 线下" prop="courseTeach">
                <el-input v-model="queryParams.courseTeach" placeholder="请输入授课方式 ：线上 、 线下" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="授课金额" prop="coursePrice">
                <el-input v-model="queryParams.coursePrice" placeholder="请输入授课金额" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="优惠金额" prop="discountPrice">
                <el-input v-model="queryParams.discountPrice" placeholder="请输入优惠金额" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="授课时间" prop="courseTime">
                <el-input v-model="queryParams.courseTime" placeholder="请输入授课时间" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="授课适合年龄" prop="courseAge">
                <el-input v-model="queryParams.courseAge" placeholder="请输入授课适合年龄" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="创建" prop="createBy">
                <el-input v-model="queryParams.createBy" placeholder="请输入创建" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="跟新" prop="updateBy">
                <el-input v-model="queryParams.updateBy" placeholder="请输入跟新" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['course:course:add']"
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['course:course:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['course:course:remove']"
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                >删除</el-button>
            </el-col>
        </el-row>

        <el-table v-loading="loading" :data="courseList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" /><el-table-column label="" align="center" prop="courseId" :show-overflow-tooltip="true" /><el-table-column label="课程名称" align="center" prop="courseName" :show-overflow-tooltip="true" /><el-table-column label="核准状态 1 待审核 ，3 失败 ， 5 已审核" align="center" prop="courseStatus" :show-overflow-tooltip="true" /><el-table-column label="介绍图片 json ["img1","img2"]" align="center" prop="courseImg" :show-overflow-tooltip="true" /><el-table-column label="课程类目" align="center" prop="courseType" :show-overflow-tooltip="true" /><el-table-column label="学科科目" align="center" prop="courseCategory" :show-overflow-tooltip="true" /><el-table-column label="授课机构" align="center" prop="organId" :show-overflow-tooltip="true" /><el-table-column label="" align="center" prop="organName" :show-overflow-tooltip="true" /><el-table-column label="授课方式 ：线上 、 线下" align="center" prop="courseTeach" :show-overflow-tooltip="true" /><el-table-column label="授课金额" align="center" prop="coursePrice" :show-overflow-tooltip="true" /><el-table-column label="优惠金额" align="center" prop="discountPrice" :show-overflow-tooltip="true" /><el-table-column label="授课时间" align="center" prop="courseTime" :show-overflow-tooltip="true" /><el-table-column label="授课适合年龄" align="center" prop="courseAge" :show-overflow-tooltip="true" />
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                            v-permisaction="['course:course:edit']"
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row)"
                    >修改</el-button>
                    <el-button
                            v-permisaction="['course:course:remove']"
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
                <el-form-item label="" prop="courseId">
                    <el-input v-model="form.courseId" placeholder="" />
                </el-form-item>
                <el-form-item label="课程名称" prop="courseName">
                    <el-input v-model="form.courseName" placeholder="课程名称" />
                </el-form-item>
                <el-form-item label="核准状态 1 待审核 ，3 失败 ， 5 已审核" prop="courseStatus">
                    <el-input v-model="form.courseStatus" placeholder="核准状态 1 待审核 ，3 失败 ， 5 已审核" />
                </el-form-item>
                <el-form-item label="介绍图片json" prop="courseImg">
                <el-input v-model="form.courseImg" placeholder="介绍图片" />
                </el-form-item>
                <el-form-item label="介绍详情" prop="courseInfo">
                    <el-input v-model="form.courseInfo" placeholder="介绍详情" />
                </el-form-item>
                <el-form-item label="介绍视频" prop="courseVideo">
                    <el-input v-model="form.courseVideo" placeholder="介绍视频" />
                </el-form-item>
                <el-form-item label="课程类目" prop="courseType">
                    <el-input v-model="form.courseType" placeholder="课程类目" />
                </el-form-item>
                <el-form-item label="学科科目" prop="courseCategory">
                    <el-input v-model="form.courseCategory" placeholder="学科科目" />
                </el-form-item>
                <el-form-item label="授课机构" prop="organId">
                    <el-input v-model="form.organId" placeholder="授课机构" />
                </el-form-item>
                <el-form-item label="" prop="organName">
                    <el-input v-model="form.organName" placeholder="" />
                </el-form-item>
                <el-form-item label="授课方式 ：线上 、 线下" prop="courseTeach">
                    <el-input v-model="form.courseTeach" placeholder="授课方式 ：线上 、 线下" />
                </el-form-item>
                <el-form-item label="授课金额" prop="coursePrice">
                    <el-input v-model="form.coursePrice" placeholder="授课金额" />
                </el-form-item>
                <el-form-item label="优惠金额" prop="discountPrice">
                    <el-input v-model="form.discountPrice" placeholder="优惠金额" />
                </el-form-item>
                <el-form-item label="授课时间" prop="courseTime">
                    <el-input v-model="form.courseTime" placeholder="授课时间" />
                </el-form-item>
                <el-form-item label="授课适合年龄" prop="courseAge">
                    <el-input v-model="form.courseAge" placeholder="授课适合年龄" />
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
                <el-form-item label="创建" prop="createBy">
                    <el-input v-model="form.createBy" placeholder="创建" />
                </el-form-item>
                <el-form-item label="跟新" prop="updateBy">
                    <el-input v-model="form.updateBy" placeholder="跟新" />
                </el-form-item>
                <el-form-item label="是否删除" prop="isDel">
                    <el-input v-model="form.isDel" placeholder="是否删除" />
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
    import { listCourse, getCourse, delCourse, addCourse, updateCourse } from '@/api/course'

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
                    pageSize: 10,courseId: undefined,courseName: undefined,courseStatus: undefined,courseImg: undefined,courseType: undefined,courseCategory: undefined,organId: undefined,organName: undefined,courseTeach: undefined,coursePrice: undefined,discountPrice: undefined,courseTime: undefined,courseAge: undefined,createBy: undefined,updateBy: undefined,
                },
                // 表单参数
                form: {},
                // 表单校验
                rules: {courseId: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    courseName: [
                        { required: true, message: '课程名称不能为空', trigger: 'blur' }
                    ],
                    courseStatus: [
                        { required: true, message: '核准状态 1 待审核 ，3 失败 ， 5 已审核不能为空', trigger: 'blur' }
                    ],
                    courseImg: [
                        { required: true, message: '介绍图片 json ["img1","img2"]不能为空', trigger: 'blur' }
                    ],
                    courseType: [
                        { required: true, message: '课程类目不能为空', trigger: 'blur' }
                    ],
                    courseCategory: [
                        { required: true, message: '学科科目不能为空', trigger: 'blur' }
                    ],
                    organId: [
                        { required: true, message: '授课机构不能为空', trigger: 'blur' }
                    ],
                    organName: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    courseTeach: [
                        { required: true, message: '授课方式 ：线上 、 线下不能为空', trigger: 'blur' }
                    ],
                    coursePrice: [
                        { required: true, message: '授课金额不能为空', trigger: 'blur' }
                    ],
                    discountPrice: [
                        { required: true, message: '优惠金额不能为空', trigger: 'blur' }
                    ],
                    courseTime: [
                        { required: true, message: '授课时间不能为空', trigger: 'blur' }
                    ],
                    courseAge: [
                        { required: true, message: '授课适合年龄不能为空', trigger: 'blur' }
                    ],
                    createBy: [
                        { required: true, message: '创建不能为空', trigger: 'blur' }
                    ],
                    updateBy: [
                        { required: true, message: '跟新不能为空', trigger: 'blur' }
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
                listCourse(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.courseList = response.data.list
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
                    courseId: undefined,
                    courseName: undefined,
                    courseStatus: undefined,
                    courseImg: undefined,
                    courseInfo: undefined,
                    courseVideo: undefined,
                    courseType: undefined,
                    courseCategory: undefined,
                    organId: undefined,
                    organName: undefined,
                    courseTeach: undefined,
                    coursePrice: undefined,
                    discountPrice: undefined,
                    courseTime: undefined,
                    courseAge: undefined,
                    createdAt: undefined,
                    updatedAt: undefined,
                    deletedAt: undefined,
                    createBy: undefined,
                    updateBy: undefined,
                    isDel: undefined,
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
                this.title = '添加Course'
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.courseId)
                this.single = selection.length !== 1
                this.multiple = !selection.length
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset()
                const courseId = row.courseId || this.ids
                getCourse(courseId).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '修改Course'
                })
            },
            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.courseId !== undefined) {
                            updateCourse(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addCourse(this.form).then(response => {
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
                const Ids = row.courseId || this.ids
                this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function() {
                    return delCourse(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>