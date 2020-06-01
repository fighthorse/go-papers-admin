<template>
    <div class="app-container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
            <el-form-item label="" prop="brandId">
                <el-input v-model="queryParams.brandId" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="品牌名称" prop="brandName">
                <el-input v-model="queryParams.brandName" placeholder="请输入品牌名称" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="成立时间" prop="brandRegister">
                <el-input v-model="queryParams.brandRegister" placeholder="请输入成立时间" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="品牌公司名称" prop="brandCompany">
                <el-input v-model="queryParams.brandCompany" placeholder="请输入品牌公司名称" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="办学资质" prop="brandQualify">
                <el-input v-model="queryParams.brandQualify" placeholder="请输入办学资质" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="融资情况" prop="brandFinancing">
                <el-input v-model="queryParams.brandFinancing" placeholder="请输入融资情况" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="课程数量" prop="brandCourseNums">
                <el-input v-model="queryParams.brandCourseNums" placeholder="请输入课程数量" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="订单数" prop="brandOrderNums">
                <el-input v-model="queryParams.brandOrderNums" placeholder="请输入订单数" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="创建" prop="createBy">
                <el-input v-model="queryParams.createBy" placeholder="请输入创建" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="更新" prop="updateBy">
                <el-input v-model="queryParams.updateBy" placeholder="请输入更新" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="核准状态 1 待审核  3 失败 5 已通过" prop="approvalStatus">
                <el-input v-model="queryParams.approvalStatus" placeholder="请输入核准状态 1 待审核  3 失败 5 已通过" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="核准时间" prop="approvalAt">
                <el-input v-model="queryParams.approvalAt" placeholder="请输入核准时间" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="核准人用户id" prop="approvalUserId">
                <el-input v-model="queryParams.approvalUserId" placeholder="请输入核准人用户id" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="审核核准人名称" prop="approvalUserName">
                <el-input v-model="queryParams.approvalUserName" placeholder="请输入审核核准人名称" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['organbrand:organbrand:add']"
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['organbrand:organbrand:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['organbrand:organbrand:remove']"
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                >删除</el-button>
            </el-col>
        </el-row>

        <el-table v-loading="loading" :data="organbrandList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" /><el-table-column label="" align="center" prop="brandId" :show-overflow-tooltip="true" /><el-table-column label="品牌logo" align="center" prop="brandLogo" :show-overflow-tooltip="true" /><el-table-column label="品牌名称" align="center" prop="brandName" :show-overflow-tooltip="true" /><el-table-column label="成立时间" align="center" prop="brandRegister" :show-overflow-tooltip="true" /><el-table-column label="品牌公司名称" align="center" prop="brandCompany" :show-overflow-tooltip="true" /><el-table-column label="办学资质" align="center" prop="brandQualify" :show-overflow-tooltip="true" /><el-table-column label="核准状态 1 待审核  3 失败 5 已通过" align="center" prop="approvalStatus" :show-overflow-tooltip="true" /><el-table-column label="审核核准人名称" align="center" prop="approvalUserName" :show-overflow-tooltip="true" />
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                            v-permisaction="['organbrand:organbrand:edit']"
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row)"
                    >修改</el-button>
                    <el-button
                            v-permisaction="['organbrand:organbrand:remove']"
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
                <el-form-item label="" prop="brandId">
                    <el-input v-model="form.brandId" placeholder="" />
                </el-form-item>
                <el-form-item label="品牌logo" prop="brandLogo">
                    <el-input v-model="form.brandLogo" placeholder="品牌logo" />
                </el-form-item>
                <el-form-item label="品牌名称" prop="brandName">
                    <el-input v-model="form.brandName" placeholder="品牌名称" />
                </el-form-item>
                <el-form-item label="成立时间" prop="brandRegister">
                    <el-input v-model="form.brandRegister" placeholder="成立时间" />
                </el-form-item>
                <el-form-item label="品牌公司名称" prop="brandCompany">
                    <el-input v-model="form.brandCompany" placeholder="品牌公司名称" />
                </el-form-item>
                <el-form-item label="办学资质" prop="brandQualify">
                    <el-input v-model="form.brandQualify" placeholder="办学资质" />
                </el-form-item>
                <el-form-item label="环境安全" prop="brandCapital">
                    <el-input v-model="form.brandCapital" placeholder="环境安全" />
                </el-form-item>
                <el-form-item label="财务授权 图片" prop="brandFina">
                    <el-input v-model="form.brandFina" placeholder="财务授权 图片" />
                </el-form-item>
                <el-form-item label="融资情况" prop="brandFinancing">
                    <el-input v-model="form.brandFinancing" placeholder="融资情况" />
                </el-form-item>
                <el-form-item label="优秀业绩" prop="brandExcellentBusiness">
                    <el-input v-model="form.brandExcellentBusiness" placeholder="优秀业绩" />
                </el-form-item>
                <el-form-item label="课程数量" prop="brandCourseNums">
                    <el-input v-model="form.brandCourseNums" placeholder="课程数量" />
                </el-form-item>
                <el-form-item label="订单数" prop="brandOrderNums">
                    <el-input v-model="form.brandOrderNums" placeholder="订单数" />
                </el-form-item>
                <el-form-item label="教师体系材料" prop="brandTeacher">
                    <el-input v-model="form.brandTeacher" placeholder="教师体系材料" />
                </el-form-item>
                <el-form-item label="创建" prop="createBy">
                    <el-input v-model="form.createBy" placeholder="创建" />
                </el-form-item>
                <el-form-item label="更新" prop="updateBy">
                    <el-input v-model="form.updateBy" placeholder="更新" />
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
                <el-form-item label="核准人用户id" prop="approvalUserId">
                    <el-input v-model="form.approvalUserId" placeholder="核准人用户id" />
                </el-form-item>
                <el-form-item label="审核核准人名称" prop="approvalUserName">
                    <el-input v-model="form.approvalUserName" placeholder="审核核准人名称" />
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
    import { listOrganBrand, getOrganBrand, delOrganBrand, addOrganBrand, updateOrganBrand } from '@/api/organbrand'

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
                    pageSize: 10,brandId: undefined,brandName: undefined,brandRegister: undefined,brandCompany: undefined,brandQualify: undefined,brandFinancing: undefined,brandCourseNums: undefined,brandOrderNums: undefined,createBy: undefined,updateBy: undefined,approvalStatus: undefined,approvalAt: undefined,approvalUserId: undefined,approvalUserName: undefined,
                },
                // 表单参数
                form: {},
                // 表单校验
                rules: {brandId: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    brandName: [
                        { required: true, message: '品牌名称不能为空', trigger: 'blur' }
                    ],
                    brandRegister: [
                        { required: true, message: '成立时间不能为空', trigger: 'blur' }
                    ],
                    brandCompany: [
                        { required: true, message: '品牌公司名称不能为空', trigger: 'blur' }
                    ],
                    brandQualify: [
                        { required: true, message: '办学资质不能为空', trigger: 'blur' }
                    ],
                    brandFinancing: [
                        { required: true, message: '融资情况不能为空', trigger: 'blur' }
                    ],
                    brandCourseNums: [
                        { required: true, message: '课程数量不能为空', trigger: 'blur' }
                    ],
                    brandOrderNums: [
                        { required: true, message: '订单数不能为空', trigger: 'blur' }
                    ],
                    createBy: [
                        { required: true, message: '创建不能为空', trigger: 'blur' }
                    ],
                    updateBy: [
                        { required: true, message: '更新不能为空', trigger: 'blur' }
                    ],
                    approvalStatus: [
                        { required: true, message: '核准状态 1 待审核  3 失败 5 已通过不能为空', trigger: 'blur' }
                    ],
                    approvalAt: [
                        { required: true, message: '核准时间不能为空', trigger: 'blur' }
                    ],
                    approvalUserId: [
                        { required: true, message: '核准人用户id不能为空', trigger: 'blur' }
                    ],
                    approvalUserName: [
                        { required: true, message: '审核核准人名称不能为空', trigger: 'blur' }
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
                listOrganBrand(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.organbrandList = response.data.list
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
                    brandId: undefined,
                    brandLogo: undefined,
                    brandName: undefined,
                    brandRegister: undefined,
                    brandCompany: undefined,
                    brandQualify: undefined,
                    brandCapital: undefined,
                    brandFina: undefined,
                    brandFinancing: undefined,
                    brandExcellentBusiness: undefined,
                    brandCourseNums: undefined,
                    brandOrderNums: undefined,
                    brandTeacher: undefined,
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
                this.title = '添加组织机构信息表'
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.brandId)
                this.single = selection.length !== 1
                this.multiple = !selection.length
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset()
                const brandId = row.brandId || this.ids
                getOrganBrand(brandId).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '修改组织机构信息表'
                })
            },
            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.brandId !== undefined) {
                            updateOrganBrand(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addOrganBrand(this.form).then(response => {
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
                const Ids = row.brandId || this.ids
                this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function() {
                    return delOrganBrand(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>