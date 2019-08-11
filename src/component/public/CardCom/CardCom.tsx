import React from 'react'
import { Card, Icon, Tag, Button, Dropdown, Menu } from 'antd'
import { connect } from 'react-redux'
import './CardCom.scss';
import api from '../../../client/api';
import { updataTodoList } from '../../../redux/action/index';

interface Props {
	type: string,
	[propsName: string]: any
}
const mpaDispathProps = {
	updataTodoList
}

const mapStateProps = (state: any) => {
	return {
		dataList: state.todo.todolist,
		Original_todoList: state.todo.Original_todoList
	}
}

class CardCom extends React.Component<Props, any> {
	static defaultProps = {
		type: '',
		data: [],
	}
	todolist: any = {};
	state = {
		warpStyle: {

		}
	}
	sort(type: any) {
		const propsType = this.props.type;
		this.props.dataList[propsType].sort((a: any, b: any) => {
			let indexA = new Date(a.add_date).getTime();
			let indexB = new Date(b.add_date).getTime();
			return type === 1 ? indexA - indexB : indexB - indexA;
		})
	}
	filter(type: any) {
		const status: any = { del: '删除', done: '已办', todo: '待办', all: '' }
		let data = this.props.Original_todoList[this.props.type].filter((val: any) => {
			return status[type] === '' ? true : val.status === status[type];
		})
		this.props.updataTodoList(data, this.props.type);
	}
	flag(id: any, val: any, e?: any) {
		if (val.status !== '待办') return
		e && e.stopPropagation()
		api.flag({ id: id }).then((res: any) => {
			if (res.data.msg === 200) {
				this.props.onDataChange();
			}
		})
	}
	del(id: number, val: any, e?: any) {
		if (val.status !== '待办') return
		e && e.stopPropagation()
		api.del({ id: id }).then((res: any) => {
			if (res.data.msg === 200) {
				// console.log(res);
				this.props.onDataChange();
			}
		})
	}
	operation(e: any, val: any) {
		// e.key === '1' && ''
		e.key === '2' && this.flag(val.id, val);
		e.key === '3' && this.del(val.id, val);
	}
	render() {
		return (<div>
			{Object.keys(this.props.dataList).length > 0 && this.props.dataList[this.props.type].map((val: any, index: number) => {
				return <div className="card-item" key={index}>
					<Card
						headStyle={{ color: `${val.tip === '紧急' ? `red` : val.tip === '中等' ? `coral` : `orange`}`, padding: '0 10px' }}
						title={<CardHeader {...val} onOperation={this.operation.bind(this)} />}
						style={{ marginBottom: 10, height: '150px', borderRadius: 4 }}
						hoverable={true}
						type="inner"
						bodyStyle={{ textDecoration: val.status === '删除' ? 'line-through' : 'none' }}
					>
						{val.detail}
					</Card>
				</div>
			})}
		</div>)
	}
}

function CardHeader(props: any) {
	const operation = (e: any) => {
		props.onOperation(e, props)
	}
	return (
		<span style={{ textDecoration: props.status === '删除' ? 'line-through' : 'none' }}>
			{/* <Tag color={props.tip === '紧急' ? 'red' : props.tip === '中等' ? 'volcano' : 'orange'}>{props.tip}</Tag> */}
			<Tag style={{ float: 'right' }} color={props.status === '删除' ? '#F50' : props.status === '待办' ? '#108ee9' : '#87d068'}>
				{props.status === '删除' ? `已${props.status}` : props.status === '待办' ? `${props.status}中` : `${props.status}`}
			</Tag>
			{props.add_date.replace(/-/g, '/').substr(2).substr(0, 14)}
			<Dropdown
				overlay={<Menu onClick={operation}>
					<Menu.Item key="1"><Icon type="eye" theme="twoTone" /><span>查看</span></Menu.Item>
					<Menu.Item key="2" disabled={props.status !== '待办'}><Icon type="flag" theme="twoTone" /><span>完成</span></Menu.Item>
					<Menu.Item key="3" disabled={props.status !== '待办'}><Icon type="delete" theme="twoTone" /><span>删除</span></Menu.Item>
				</Menu>}
				placement="bottomLeft"
			>
				<Button size="small" type="link" style={{ float: 'right', height: 22 }}>
					操作
        </Button>
			</Dropdown>
		</span>
	)
}


export default connect(mapStateProps, mpaDispathProps, null, { forwardRef: true })(CardCom)