import React from 'react';
import {
  Form,
  Input,
  Select,
  Button,
} from 'antd';
import Api from '../../client/api';

const { Option } = Select;
const { TextArea } = Input;


class addTodo extends React.Component<any, any> {

  state = {
    type: []
  }

  handleSubmit(e: any) {
    e.preventDefault();
    this.props.form.validateFields((err: any, value: any) => {
      let parmas = {
        tip: value.emergency,
        type: value.type,
        detail: value.detail
      }
      Api.addToDo(parmas)
    })
  }

  componentWillMount() {
    Api.getType().then((res: any) => {
      this.setState({
        type: res.data.data
      })
    })
  }

  render() {
    const formLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 14 },
    }
    const { getFieldDecorator } = this.props.form
    const { type } = this.state;
    return (
      <Form {...formLayout} onSubmit={this.handleSubmit.bind(this)}>
        <Form.Item
          label="紧急程度"
        >
          {getFieldDecorator('emergency', {
            rules: [{ required: true, message: '请选择紧急程度' }]
          })(
            <Select
              placeholder="紧急/中等/正常"
            >
              <Option value="紧急">紧急</Option>
              <Option value="中等">中等</Option>
              <Option value="正常">正常</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label="标签"
        >
          {getFieldDecorator('type', {
            rules: [{ required: true, message: '请选择标签' }]
          })(
            <Select
              placeholder="工作/生活/..."
            >
              {type.map((val: any, i: number) => {
                return (
                  <Option key={i} value={val.type}>{val.type}</Option>
                )
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="代办详情">
          {getFieldDecorator('detail', {
            rules: [{ required: true, message: '请输入代办详情' }]
          })(
            <TextArea placeholder='代办详情' rows={4} />
          )}
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 2 },
            sm: { span: 16, offset: 2 },
          }}
        >
          <Button type="primary" htmlType="submit">
            添加代办
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const WrapAddTodo = Form.create({ name: 'addTodo' })(addTodo)
export default WrapAddTodo