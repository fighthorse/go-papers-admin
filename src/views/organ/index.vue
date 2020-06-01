<template>
    <div class="app-container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
            <el-form-item label="" prop="organId">
                <el-input v-model="queryParams.organId" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="品牌名称" prop="organBrand">
                <el-input v-model="queryParams.organBrand" placeholder="请输入品牌名称" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="品牌logo" prop="organBrandLogo">
                <el-input v-model="queryParams.organBrandLogo" placeholder="请输入品牌logo" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="机构名称" prop="organName">
                <el-input v-model="queryParams.organName" placeholder="请输入机构名称" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="机构成立时间" prop="organRegister">
                <el-input v-model="queryParams.organRegister" placeholder="请输入机构成立时间" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="教师数量" prop="organTeacherNums">
                <el-input v-model="queryParams.organTeacherNums" placeholder="请输入教师数量" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="经营方式：直营 、 加盟 " prop="organBusiness">
                <el-input v-model="queryParams.organBusiness" placeholder="请输入经营方式：直营 、 加盟 " clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="机构省份" prop="organProvince">
                <el-input v-model="queryParams.organProvince" placeholder="请输入机构省份" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="城市" prop="organCity">
                <el-input v-model="queryParams.organCity" placeholder="请输入城市" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="区域" prop="organArea">
                <el-input v-model="queryParams.organArea" placeholder="请输入区域" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="机构引导的 管家妈妈" prop="organMomId">
                <el-input v-model="queryParams.organMomId" placeholder="请输入机构引导的 管家妈妈" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="创建人" prop="createBy">
                <el-input v-model="queryParams.createBy" placeholder="请输入创建人" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="更新人" prop="updateBy">
                <el-input v-model="queryParams.updateBy" placeholder="请输入更新人" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="核准状态" prop="approvalStatus">
                <el-input v-model="queryParams.approvalStatus" placeholder="请输入核准状态" clearable size="small" @keyup.enter.native="handleQuery" />
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
                        v-permisaction="['organ:organ:add']"
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['organ:organ:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['organ:organ:remove']"
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                >删除</el-button>
            </el-col>
        </el-row>

        <el-table v-loading="loading" :data="organList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" /><el-table-column label="" align="center" prop="organId" :show-overflow-tooltip="true" /><el-table-column label="品牌名称" align="center" prop="organBrand" :show-overflow-tooltip="true" /><el-table-column label="品牌logo" align="center" prop="organBrandLogo" :show-overflow-tooltip="true" /><el-table-column label="机构名称" align="center" prop="organName" :show-overflow-tooltip="true" /><el-table-column label="机构成立时间" align="center" prop="organRegister" :show-overflow-tooltip="true" /><el-table-column label="经营方式：直营 、 加盟 " align="center" prop="organBusiness" :show-overflow-tooltip="true" />
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                            v-permisaction="['organ:organ:edit']"
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row)"
                    >修改</el-button>
                    <el-button
                            v-permisaction="['organ:organ:remove']"
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
                <el-form-item label="" prop="organId">
                    <el-input v-model="form.organId" placeholder="" />
                </el-form-item>
                <el-form-item label="品牌名称" prop="organBrand">
                    <el-input v-model="form.organBrand" placeholder="品牌名称" />
                </el-form-item>
                <el-form-item label="品牌logo" prop="organBrandLogo">
                    <el-input v-model="form.organBrandLogo" placeholder="品牌logo" />
                </el-form-item>
                <el-form-item label="机构名称" prop="organName">
                    <el-input v-model="form.organName" placeholder="机构名称" />
                </el-form-item>
                <el-form-item label="机构成立时间" prop="organRegister">
                    <el-input v-model="form.organRegister" placeholder="机构成立时间" />
                </el-form-item>
                <el-form-item label="机构封面图" prop="organCover">
                    <el-input v-model="form.organCover" placeholder="机构封面图" />
                </el-form-item>
                <el-form-item label="办学资质" prop="organQualify">
                    <el-input v-model="form.organQualify" placeholder="办学资质" />
                </el-form-item>
                <el-form-item label="环境安全" prop="organEnv">
                    <el-input v-model="form.organEnv" placeholder="环境安全" />
                </el-form-item>
                <el-form-item label="在线支付" prop="organPay">
                    <el-input v-model="form.organPay" placeholder="在线支付" />
                </el-form-item>
                <el-form-item label="财务授权 图片" prop="organFina">
                    <el-input v-model="form.organFina" placeholder="财务授权 图片" />
                </el-form-item>
                <el-form-item label="佣金 金额" prop="organMoney">
                    <el-input v-model="form.organMoney" placeholder="佣金 金额" />
                </el-form-item>
                <el-form-item label="课程科目数量" prop="organCourseNums">
                    <el-input v-model="form.organCourseNums" placeholder="课程科目数量" />
                </el-form-item>
                <el-form-item label="平台总销量" prop="organCourseOrder">
                    <el-input v-model="form.organCourseOrder" placeholder="平台总销量" />
                </el-form-item>
                <el-form-item label="研发能力材料" prop="organCourseQualify">
                    <el-input v-model="form.organCourseQualify" placeholder="研发能力材料" />
                </el-form-item>
                <el-form-item label="教师体系材料 图片" prop="organTeacherQualify">
                    <el-input v-model="form.organTeacherQualify" placeholder="教师体系材料 图片" />
                </el-form-item>
                <el-form-item label="教师数量" prop="organTeacherNums">
                    <el-input v-model="form.organTeacherNums" placeholder="教师数量" />
                </el-form-item>
                <el-form-item label="平均年龄" prop="organTeacherAge">
                    <el-input v-model="form.organTeacherAge" placeholder="平均年龄" />
                </el-form-item>
                <el-form-item label="教师流动性" prop="organTeacherFlow">
                    <el-input v-model="form.organTeacherFlow" placeholder="教师流动性" />
                </el-form-item>
                <el-form-item label="经营方式：直营 、 加盟 " prop="organBusiness">
                    <el-input v-model="form.organBusiness" placeholder="经营方式：直营 、 加盟 " />
                </el-form-item>
                <el-form-item label="注册资金" prop="organCapital">
                    <el-input v-model="form.organCapital" placeholder="注册资金" />
                </el-form-item>
                <el-form-item label="融资情况" prop="organFinancing">
                    <el-input v-model="form.organFinancing" placeholder="融资情况" />
                </el-form-item>
                <el-form-item label="机构联系电话" prop="organTel">
                    <el-input v-model="form.organTel" placeholder="机构联系电话" />
                </el-form-item>
                <el-form-item label="机构用户id" prop="organUserId">
                    <el-input v-model="form.organUserId" placeholder="机构用户id" />
                </el-form-item>
                <el-form-item label="机构地址" prop="organAddr">
                    <el-input v-model="form.organAddr" placeholder="机构地址" />
                </el-form-item>
                <el-form-item label="机构省份" prop="organProvince">
                    <el-input v-model="form.organProvince" placeholder="机构省份" />
                </el-form-item>
                <el-form-item label="城市" prop="organCity">
                    <el-input v-model="form.organCity" placeholder="城市" />
                </el-form-item>
                <el-form-item label="区域" prop="organArea">
                    <el-input v-model="form.organArea" placeholder="区域" />
                </el-form-item>
                <el-form-item label="经纬度 - 经度" prop="organLt">
                    <el-input v-model="form.organLt" placeholder="经纬度 - 经度" />
                </el-form-item>
                <el-form-item label="经纬度 -纬度" prop="organWt">
                    <el-input v-model="form.organWt" placeholder="经纬度 -纬度" />
                </el-form-item>
                <el-form-item label="机构简介" prop="organDesc">
                    <el-input v-model="form.organDesc" placeholder="机构简介" />
                </el-form-item>
                <el-form-item label="" prop="addTime">
                    <el-input v-model="form.addTime" placeholder="" />
                </el-form-item>
                <el-form-item label="机构引导的 管家妈妈" prop="organMomId">
                    <el-input v-model="form.organMomId" placeholder="机构引导的 管家妈妈" />
                </el-form-item>
                <el-form-item label="机构热度" prop="organHots">
                    <el-input v-model="form.organHots" placeholder="机构热度" />
                </el-form-item>
                <el-form-item label="创建人" prop="createBy">
                    <el-input v-model="form.createBy" placeholder="创建人" />
                </el-form-item>
                <el-form-item label="更新人" prop="updateBy">
                    <el-input v-model="form.updateBy" placeholder="更新人" />
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
                <el-form-item label="核准状态" prop="approvalStatus">
                    <el-input v-model="form.approvalStatus" placeholder="核准状态" />
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
    import { listOrgan, getOrgan, delOrgan, addOrgan, updateOrgan } from '@/api/organ'

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
                    pageSize: 10,organId: undefined,organBrand: undefined,organBrandLogo: undefined,organName: undefined,organRegister: undefined,organTeacherNums: undefined,organBusiness: undefined,organProvince: undefined,organCity: undefined,organArea: undefined,organMomId: undefined,createBy: undefined,updateBy: undefined,approvalStatus: undefined,approvalUserName: undefined,
                },
                // 表单参数
                form: {},
                // 表单校验
                rules: {organId: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    organBrand: [
                        { required: true, message: '品牌名称不能为空', trigger: 'blur' }
                    ],
                    organBrandLogo: [
                        { required: true, message: '品牌logo不能为空', trigger: 'blur' }
                    ],
                    organName: [
                        { required: true, message: '机构名称不能为空', trigger: 'blur' }
                    ],
                    organRegister: [
                        { required: true, message: '机构成立时间不能为空', trigger: 'blur' }
                    ],
                    organTeacherNums: [
                        { required: true, message: '教师数量不能为空', trigger: 'blur' }
                    ],
                    organBusiness: [
                        { required: true, message: '经营方式：直营 、 加盟 不能为空', trigger: 'blur' }
                    ],
                    organProvince: [
                        { required: true, message: '机构省份不能为空', trigger: 'blur' }
                    ],
                    organCity: [
                        { required: true, message: '城市不能为空', trigger: 'blur' }
                    ],
                    organArea: [
                        { required: true, message: '区域不能为空', trigger: 'blur' }
                    ],
                    organMomId: [
                        { required: true, message: '机构引导的 管家妈妈不能为空', trigger: 'blur' }
                    ],
                    createBy: [
                        { required: true, message: '创建人不能为空', trigger: 'blur' }
                    ],
                    updateBy: [
                        { required: true, message: '更新人不能为空', trigger: 'blur' }
                    ],
                    approvalStatus: [
                        { required: true, message: '核准状态不能为空', trigger: 'blur' }
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
                listOrgan(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.organList = response.data.list
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
                    organId: undefined,
                    organBrand: undefined,
                    organBrandLogo: undefined,
                    organName: undefined,
                    organRegister: undefined,
                    organCover: undefined,
                    organQualify: undefined,
                    organEnv: undefined,
                    organPay: undefined,
                    organFina: undefined,
                    organMoney: undefined,
                    organCourseNums: undefined,
                    organCourseOrder: undefined,
                    organCourseQualify: undefined,
                    organTeacherQualify: undefined,
                    organTeacherNums: undefined,
                    organTeacherAge: undefined,
                    organTeacherFlow: undefined,
                    organBusiness: undefined,
                    organCapital: undefined,
                    organFinancing: undefined,
                    organTel: undefined,
                    organUserId: undefined,
                    organAddr: undefined,
                    organProvince: undefined,
                    organCity: undefined,
                    organArea: undefined,
                    organLt: undefined,
                    organWt: undefined,
                    organDesc: undefined,
                    addTime: undefined,
                    organMomId: undefined,
                    organHots: undefined,
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
                this.ids = selection.map(item => item.organId)
                this.single = selection.length !== 1
                this.multiple = !selection.length
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset()
                const organId = row.organId || this.ids
                getOrgan(organId).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '修改组织机构信息表'
                })
            },
            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.organId !== undefined) {
                            updateOrgan(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addOrgan(this.form).then(response => {
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
                const Ids = row.organId || this.ids
                this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function() {
                    return delOrgan(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>