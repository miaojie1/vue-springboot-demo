<template>
  <div>
    <Row>
      <i-col span="8" push="1">
        <Input search enter-button placeholder="输入学号，根据学号查找" v-model="searchValue" @on-search="search"/>
      </i-col>
      <i-col span="5">
        <Button type="primary" @click="add">增加</Button>
      </i-col>
    </Row>
    <Table border :columns="columns" :data="studentLists" style="margin-top: 30px">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="update(index)">编辑</Button>
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
        <Button type="primary" @click="confirmAdd('formData')">提交</Button>
        <Button @click="cancelAdd('formData')" style="margin-left: 8px">取消</Button>
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
        <Button type="primary" @click="confirmUpdate('formData')">提交</Button>
        <Button @click="cancelUpdate('formData')" style="margin-left: 8px">取消</Button>
      </div>
    </Modal>
    <Modal
      v-model="showDeleteModal"
      width="360">
      <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>删除提醒</span>
      </p>
      <div style="text-align:center">
          <p>删除后将不可恢复</p>
          <p>您确认删除?</p>
      </div>
      <div slot="footer">
        <Button type="error" @click="confirmDelete()">删除</Button>
        <Button @click="cancelDelete()" style="margin-left: 8px">取消</Button>
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
      showAddModal: false,
      showUpdateModal: false,
      showDeleteModal: false,
      searchValue: '',
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
    getData () {
      this.$http.get('/studentList').then(res => {
        this.studentLists = res.data.data
      })
    },
    add () {
      this.showAddModal = true
      // this.formData = []
    },
    update (index) {
      this.showUpdateModal = true
      this.formData = this.studentLists[index]
    },
    remove (index) {
      this.showDeleteModal = true
      this.formData = this.studentLists[index]
    },
    // 向后台提交
    confirmAdd (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$http.post('/insertStudent', JSON.stringify(this.formData)).then(res => {
            this.showAddModal = false
            if (res.data.state === 200) {
              this.getData()
              this.$Message.success('Success!')
            }
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    cancelAdd (name) {
      this.$refs[name].resetFields()
      this.showAddModal = false
    },
    confirmUpdate (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$http.post('/insertStudent', JSON.stringify(this.formData)).then(res => {
            this.showUpdateModal = false
            if (res.data.state === 200) {
              this.getData()
              this.formData.userName = ''
              this.formData.passWord = ''
              this.formData.stuNum = ''
              this.$Message.success('Success!')
            }
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    cancelUpdate (name) {
      this.showUpdateModal = false
      // this.$refs[name].resetFields()
    },
    confirmDelete () {
      this.$http.post('/deleteStudent', JSON.stringify(this.formData)).then(res => {
        this.showDeleteModal = false
        if (res.data.state === 200) {
          this.getData()
          this.$Message.success('Success!')
        } else if (res.data.state === 500) {
          this.$Message.error('Fail!')
        }
      })
    },
    cancelDelete () {
      this.$Message.success('取消删除!')
      this.showDeleteModal = false
    },
    search () {
      let params = {
        stuNum: this.searchValue
      }
      this.$http.get('/searchStudentList', params).then(res => {
        if (res.status === 200) {
          this.studentLists = res.data
        }
      })
    }
  }
}
</script>
