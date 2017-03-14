import React from 'react';
import request from 'superagent';
import {Menu, Icon} from 'antd';
import './css/left.css';
import {hashHistory} from 'react-router';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


export default class Left extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headImg: '',
            realName: '',
            userAccount: ''
        }
    }

    componentWillMount() {
        request
            .get('/api/personal')
            .end((err, res) => {
                if (err || res.statusCode === 401) {
                    alert('please login!');
                    return hashHistory.push('/login');
                }
                const {id, userAccount, headImg, realName, userType} = res.body;
                this.setState({id, userAccount, headImg, realName, userType, isLogin: true});
                this._showUserInfo(userAccount);
            });
    }

    handleClick(e) {
        switch (e.key) {
            case '1':
                hashHistory.push('questionBankList');
                break;
            case '2':
                hashHistory.push('examPaperList');
                break;
            case '3':
                hashHistory.push('examList');
                break;
            case '4':
                hashHistory.push('personalPage');
                break;
            case '5':
                hashHistory.push('scoreList');
                break;
            case '6':
                hashHistory.push('reviewExam');
                break;
            case '7':
                hashHistory.push('reviewExamSel');
                break;
            case '8':
                hashHistory.push('analysisScore');
                break;
            case '9':
                hashHistory.push('addTeacher');
                break;
        }

    };

    render() {
        var {nickname, userType} = this.props;
        return (<div>

            <div className="container" style={{width: "210px", marginTop: "20px"}}>
                <div className="leftImgArea">
                    <img src={this.state.headImg} id="leftHeadImg" className="img-circle headImg"/>
                    <div className="userName">{this.state.realName}</div>
                    <div className="userType">{userType == 1 ? '教师' : ''}</div>
                </div>
                <Menu
                    onClick={this.handleClick}
                    style={{width: 200}}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}
                    mode="inline"
                >

                    <SubMenu key="sub1" title={<span><Icon type="mail"/><span>试题试卷</span></span>}>
                        <Menu.Item key="1" onClick={this.goToPage("questionBankList")}><Icon type="file"/>试题</Menu.Item>
                        <Menu.Item key="2"><Icon type="copy"/>试卷</Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub2" title={<span><Icon type="appstore"/><span>考试管理</span></span>}>
                        <Menu.Item key="3"><Icon type="switcher"/>考试</Menu.Item>
                        <Menu.Item key="5"><Icon type="exception"/>成绩</Menu.Item>
                        <Menu.Item key="8"><Icon type="pie-chart"/>分析</Menu.Item>
                        <SubMenu key="sub4" title="试卷评阅">
                            <Menu.Item key="7"><Icon type="solution"/>选择题</Menu.Item>
                            <Menu.Item key="6"><Icon type="solution"/>简答题</Menu.Item>
                        </SubMenu>
                    </SubMenu>

                    <SubMenu key="sub3" title={<span><Icon type="setting"/><span>个人中心</span></span>}>
                        <Menu.Item key="4"><Icon type="user"/>个人中心</Menu.Item>
                        {this.state.userAccount === 'teacher' ?
                            <Menu.Item key="9"><Icon type="plus-circle" />添加教师</Menu.Item>
                            : ''
                        }
                    </SubMenu>
                </Menu>
            </div>
        </div>);
    }

    goToPage(page) {
        return () => {
            hashHistory.push(page);
        }
    }
};