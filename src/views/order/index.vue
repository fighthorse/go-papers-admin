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
                        v-permisaction="['order:order:add']"
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['order:order:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['order:order:remove']"
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                >删除</el-button>
            </el-col>
        </el-row>

        <el-table v-loading="loading" :data="orderList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                            v-permisaction="['order:order:edit']"
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row)"
                    >修改</el-button>
                    <el-button
                            v-permisaction="['order:order:remove']"
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
                <el-form-item label="" prop="orderId">
                    <el-input v-model="form.orderId" placeholder="" />
                </el-form-item>
                <el-form-item label="" prop="orderNo">
                    <el-input v-model="form.orderNo" placeholder="" />
                </el-form-item>
                <el-form-item label="订单标题" prop="orderName">
                    <el-input v-model="form.orderName" placeholder="订单标题" />
                </el-form-item>
                <el-form-item label="订单状态 1 进行中  5  待付款  10 已支付  50 已完成 70 已部分退款 80全部退款 90 已关闭" prop="orderStatus">
                    <el-input v-model="form.orderStatus" placeholder="订单状态 1 进行中  5  待付款  10 已支付  50 已完成 70 已部分退款 80全部退款 90 已关闭" />
                </el-form-item>
                <el-form-item label="" prop="orderPrice">
                    <el-input v-model="form.orderPrice" placeholder="" />
                </el-form-item>
                <el-form-item label="" prop="memberId">
                    <el-input v-model="form.memberId" placeholder="" />
                </el-form-item>
                <el-form-item label="" prop="memberPhone">
                    <el-input v-model="form.memberPhone" placeholder="" />
                </el-form-item>
                <el-form-item label="课程封面" prop="courseCover">
                    <el-input v-model="form.courseCover" placeholder="课程封面" />
                </el-form-item>
                <el-form-item label="课程id" prop="courseId">
                    <el-input v-model="form.courseId" placeholder="课程id" />
                </el-form-item>
                <el-form-item label="" prop="createTime">
                    <el-input v-model="form.createTime" placeholder="" />
                </el-form-item>
                <el-form-item label="支付类型 wx ali " prop="payType">
                    <el-input v-model="form.payType" placeholder="支付类型 wx ali " />
                </el-form-item>
                <el-form-item label="支付单号" prop="payNo">
                    <el-input v-model="form.payNo" placeholder="支付单号" />
                </el-form-item>
                <el-form-item label="支付时间" prop="payTime">
                    <el-input v-model="form.payTime" placeholder="支付时间" />
                </el-form-item>
                <el-form-item label="" prop="refundTime">
                    <el-input v-model="form.refundTime" placeholder="" />
                </el-form-item>
                <el-form-item label="" prop="closeTime">
                    <el-input v-model="form.closeTime" placeholder="" />
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
    import { listOrder, getOrder, delOrder, addOrder, updateOrder } from '@/api/order'

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
                listOrder(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.orderList = response.data.list
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
                    orderId: undefined,
                    orderNo: undefined,
                    orderName: undefined,
                    orderStatus: undefined,
                    orderPrice: undefined,
                    memberId: undefined,
                    memberPhone: undefined,
                    courseCover: undefined,
                    courseId: undefined,
                    createTime: undefined,
                    payType: undefined,
                    payNo: undefined,
                    payTime: undefined,
                    refundTime: undefined,
                    closeTime: undefined,
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
                this.title = '添加Order'
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.orderId)
                this.single = selection.length !== 1
                this.multiple = !selection.length
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset()
                const orderId = row.orderId || this.ids
                getOrder(orderId).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '修改Order'
                })
            },
            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.orderId !== undefined) {
                            updateOrder(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addOrder(this.form).then(response => {
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
                const Ids = row.orderId || this.ids
                this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function() {
                    return delOrder(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>