<template>
  <div>
    <Button type="primary" @click="add">增加</Button>
    <Table border :columns="columns" :data="studentLists" style="margin-top: 30px">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button>
        <Button type="error" size="small" @click="remove(index)">删除</Button>
      </template>
    </Table>
    <Modal
      v-model="showAddModal"
      title="添加">
      <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="80">
        <FormItem label="用户名" prop="userName">
          <Input v-model="formData.userName" placeholder="用户名" />
        </FormItem>
        <FormItem label="密码" prop="passWord">
          <Input v-model="formData.passWord" placeholder="密码" />
        </FormItem>
        <FormItem label="学号" prop="stuNum">
          <Input v-model="formData.stuNum" placeholder="学号" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleSubmit('formData')">提交</Button>
        <Button @click="handleReset('formData')" style="margin-left: 8px">取消</Button>
      </div>
    </Modal>
    <Modal
      v-model="showUpdateModal"
      title="修改">
      <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="80">
        <FormItem label="用户名" prop="userName">
          <Input v-model="formData.userName" placeholder="用户名" />
        </FormItem>
        <FormItem label="密码" prop="passWord">
          <Input v-model="formData.passWord" placeholder="密码" />
        </FormItem>
        <FormItem label="学号" prop="stuNum">
          <Input v-model="formData.stuNum" placeholder="学号" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleSubmit('formData')">提交</Button>
        <Button @click="handleReset('formData')" style="margin-left: 8px">取消</Button>
      </div>
    </Modal>
    <Modal v-model="showDeleteModal" width="360">
      <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>删除提醒</span>
      </p>
      <div style="text-align:center">
          <p>删除后将不可恢复</p>
          <p>您确认删除?</p>
      </div>
      <div slot="footer">
          <Button type="error" size="large" long @click="confirmDelete">删除</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      columns: [
        {
          title: '用户名',
          key: 'userName'
        },
        {
          title: '密码',
          key: 'passWord'
        },
        {
          title: '学号',
          key: 'stuNum'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      studentLists: [],
      columnName: [],
      showAddModal: false,
      showUpdateModal: false,
      showDeleteModal: false,
      formData: {
        userName: '',
        passWord: '',
        stuNum: ''
      },
      ruleValidate: {
        userName: [
          { required: true, message: '用户名不可以为空', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '密码不可以为空', trigger: 'blur' }
        ],
        stuNum: [
          { required: true, message: '学号不可以为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    show (index) {
      this.showUpdateModal = true
      this.formData = this.studentLists[index]
    },
    remove (index) {
      this.showDeleteModal = true
      this.formData = this.studentLists[index]
      console.log(this.studentLists[index])
      // this.$Modal.info(config)
    },
    confirmDelete () {
      // this.$Modal.info(config)
      this.$http.delete('/deleteStudent').then(res => {
        console.log(res)
      })
    },
    getData () {
      this.$http.get('/studentList').then(res => {
        this.studentLists = res.data.data
      })
    },
    add () {
      this.showAddModal = true
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$http.post('/insertStudent', JSON.stringify(this.formData)).then(res => {
            console.log(JSON.stringify(this.formData))
            if (res.data.data.state === 200) {
              this.getData()
            }
            console.log(res)
          })
          // this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs.formData.resetFields()
      this.showAddModal = false
    }
  }
}
</script>
