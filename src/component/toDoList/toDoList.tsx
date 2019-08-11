import React from 'react';
import Api from './../../client/api'
import { Card, Row, Col, Tag, Icon, Menu, Button, Dropdown } from 'antd';
import CardCom from '../public/CardCom/CardCom';
import './todoList.scss'
import { connect } from 'react-redux'
import { setToDoList, setType } from '../../redux/action/index';
const mapStateProps = (state: any) => {
  return {
    ...state
  }
}
const mapDispathToProps = {
  setToDoList,
  setType,
}
class ToDoList extends React.Component<any, any> {
  state: { [propName: string]: any } = {
    tipArr: [],
    sortStatus: {}
  }
  refArr: Array<any> = [];
  getToDoList() {
    return new Promise((resolve: any, reject: any) => {
      Api.getTodoList().then((res: any) => {
        this.setState((state: any) => {
          let set = new Set();
          res.data.data.map((val: any) => {return set.add(val.type) })
          return { tipArr: Array.from(set) }
        }, () => {
          this.props.setType(this.state.tipArr).then(() => {
            this.props.setToDoList([...res.data.data]).then((res: any) => {
              resolve()
            });
          })
        })
      })
    })
  }
  componentWillMount() {
    this.getToDoList().then(() => {
      this.state.tipArr.forEach((val: any) => {
        this.setState((state: any) => {
          let obj: any = { ...state.sortStatus }
          obj[val] = 1;
          return {
            sortStatus: obj
          }
        })
      })
    })
  }
  sort(i: number, sortType: number, target: string, e: any) {
    e.stopPropagation()
    this.refArr[i].current.sort(sortType);
    this.setState((state: any) => {
      state.sortStatus[target] *= -1;
      return {
        sortStatus: state.sortStatus
      }
    })
  }
  onDataChange() {
    this.getToDoList();
  }
  filter(arg: any, i: number, e: any) {
    e.stopPropagation()
    this.refArr[i].current.filter(arg)
  }
  render() {
    const { tipArr, sortStatus } = this.state
    return (
      <Row gutter={16}>
        {tipArr.map((val: any, i: number) => {
          this.refArr.push(React.createRef());
          //生成随机深色 r*0.299 + g*0.578 + b*0.114 < 192  为深色
          let R = Math.random() * 255
          let B = Math.random() * 255
          let G = 192 - R - B;
          let deepRGB = `rgb(${R},${G},${B})`
          return <Col
            key={i}
            xs={{ span: 24 }}
            md={{ span: 8 }}
            xl={{ span: 6 }}
            xxl={{ span: 4 }}
          >
            <Card
              title={
                <div>
                  <Tag color={deepRGB}>{val}</Tag>
                  <span>
                    <Dropdown
                      overlay={<Menu>
                        <Menu.Item><span onClick={this.filter.bind(this, 'all', i)}>全部</span></Menu.Item>                        
                        <Menu.Item><span onClick={this.filter.bind(this, 'del', i)}>已删除</span></Menu.Item>
                        <Menu.Item><span onClick={this.filter.bind(this, 'done', i)}>已完成</span></Menu.Item>
                        <Menu.Item><span onClick={this.filter.bind(this, 'todo', i)}>待办中</span></Menu.Item>
                      </Menu>}
                      placement="bottomCenter"
                    >
                      <Button size="small" type="link">
                        <Icon type="filter" theme="twoTone" />
                        筛选
                      </Button>
                    </Dropdown>
                  </span>
                  {sortStatus[val] === -1 && <span className="sort" onClick={this.sort.bind(this, i, 1, val)}>
                    <Icon type="sort-ascending" />
                  </span>}
                  {sortStatus[val] === 1 && <span className="sort" onClick={this.sort.bind(this, i, 0, val)}>
                    <Icon type="sort-descending" />
                  </span>}
                </div>
              }
              style={{ marginBottom: 10, borderRadius: 4 }}
              headStyle={{ fontWeight: 'bold' }}
              bodyStyle={{ padding: 15 }}
            >
              <CardCom ref={this.refArr[i]} type={val} onDataChange={this.onDataChange.bind(this)} />
            </Card>
          </Col>
        })}
      </Row>
    )
  }
}

export default connect(mapStateProps, mapDispathToProps)(ToDoList)