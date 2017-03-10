import React, {Component} from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router';
import '../css/personal-page.css';
import '../css/personalPage.css';

export default class PersonalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            id: 0,
            userAccount: 'uk',
            nickname: 'uk',
            headImg: 'uk',
            password: 'uk',
            realName: 'uk',
            cardId: 'uk',
            sex: 'uk',
            email: 'uk',//邮箱
            phone: 'uk',//电话
            branch: 'uk',//分院
            major: 'uk',//专业
            grade: 0,//年级
            classroom: 'uk',//班级
            type: 0,//用户类型，0：学生；1：教师

            selectedImage: null,
            uploadedImages: '',

            username: 'unknown',
            // password: 'unknown',
            // phone: 'unknown',
            // email: 'unknown',
            examId: 'unknown',
            examName: 'unknown',
            score: 'unknown',
            data: []
        };
    }

    componentWillMount() {
        request
            .get('/api/personal')
            .end((err, res) => {
                if (err || res.statusCode === 401) {
                    alert('please login!');
                    return hashHistory.push('/login');
                }
                // const {username, phone, email, password} = res.body;
                const {id, userAccount, headImg, userType} = res.body;
                // this.setState({username: username, phone, email, password, isLogin: true});
                this.setState({id, userAccount, headImg, userType, isLogin: true});
                this._showUserInfo(userAccount);
            });
    }


    _showScore(event) {
        $("#userInfo").collapse('hide')
        request.get('/api/score/getMyAllScore')
            .query({
                username: this.state.userAccount,
            })
            .end((err, data) => {
                // const {examId, examName, score} = data;
                // console.log(data.body);
                this.setState({
                    data: data.body
                });
                return hashHistory.push('/myScore');
            });
    }


    render() {

        this.state.totalPayPrice = 0;
        return <div>
            {this.state.isLogin === false ? "" :
                <div className="container-fluid">
                    <div className="col-md-2" role="tablist">
                        <br/>
                        <br/>
                        <br/>
                        <ul className="nav  nav-pills nav-stacked ">
                            <li role="presentation" data-toggle="tab" className="active" onClick={this._showUserInfo.bind(this)}>
                                <a className="list-group-item text-center" role="presentation" data-toggle="collapse" href="#userInfo"
                                   aria-controls="userInfo">个人信息</a>
                            </li>
                            <li role="presentation" data-toggle="tab">
                                <a className="list-group-item text-center" role="presentation" data-toggle="collapse"
                                   href="#userScore"
                                   aria-controls="orderInfomations" onClick={this._showScore.bind(this)}>成绩</a>
                            </li>
                        </ul>
                    </div>


                    <div className="col-md-10">
                        <div className="tab-content">
                            <div className="page-header">
                                <h1> Welcome

                                    {/*<small>{this.state.nickname}</small>*/}
                                </h1>
                            </div>

                            <div className="collapse in" id="userInfo">
                                <div className="well">
                                    <form className="form-horizontal" id="userInfoForm">
                                        <div className="form-group">
                                            <div className="col-sm-2" ></div>
                                            <div className="col-sm-7" >

                                            <img id="headImg" className="center-block img-circle" src={this.state.headImg} alt="headImg" width="60px"
                                                 height="60px" onClick={this._uploadImg.bind(this)} style={{cursor: "pointer"}}/>
                                            </div>
                                        </div>
                                        <div className="form-group" style={{marginLeft:"5px"}}>
                                            <label className="col-sm-4 control-label">昵称：</label>
                                            <div className="col-sm-5 " >
                                                <div className="userInfo" id="nicknameArea">
                                                    <img style={{marginRight:"5px"}} src={this.state.sex === 0 ? '../images/female.png' : '../images/male.png' }
                                                         className="iconImg" onClick={this._sexChange.bind(this)}/>
                                                    {this.state.nickname}
                                                    <span className="glyphicon glyphicon-edit"
                                                          onClick={this._editOnClick("nickname")}/>
                                                </div>
                                                <input type="text" style={{display:"none"}}  className="form-control changedItem" id="nickname"
                                                       value={this.state.nickname} onChange={this._nicknameChange.bind(this)}/>
                                            </div>
                                        </div>
                                        <div className="form-group" style={{marginLeft:"5px"}}>
                                            <label className="col-sm-4 control-label">账号：</label>
                                            <div className="col-sm-5">
                                                <div className="userInfo" id="userAccountArea" >
                                                    {this.state.userAccount}
                                                    {/*<span  className="glyphicon glyphicon-edit"*/}
                                                            {/*onClick={this._editOnClick("userAccount")}/>*/}
                                                </div>
                                                <input type="text" style={{display:"none"}} className="form-control" id="userAccount"
                                                       value={this.state.userAccount} onChange={this._userAccountChange.bind(this)}/>
                                            </div>
                                        </div>
                                        <div className="form-group" style={{marginLeft:"5px"}}>
                                            <label className="col-sm-4 control-label">真实姓名：</label>
                                            <div className="col-sm-5">
                                                <div className="userInfo" id="realNameArea">
                                                    {this.state.realName}
                                                    <span  className="glyphicon glyphicon-edit"
                                                           onClick={this._editOnClick("realName")}/>
                                                </div>
                                                <input type="text" style={{display:"none"}} className="form-control changedItem" id="realName"
                                                       value={this.state.realName} onChange={this._realNameChange.bind(this)}/>
                                            </div>
                                        </div>
                                        <div className="form-group" style={{marginLeft:"5px"}}>
                                            <label className="col-sm-4 control-label">学号：</label>
                                            <div className="col-sm-5">
                                                <div className="userInfo" id="cardIdArea">
                                                    {this.state.cardId}
                                                    {/*<span  className="glyphicon glyphicon-edit"*/}
                                                           {/*onClick={this._editOnClick("cardId")}/>*/}
                                                </div>
                                                <input type="text" style={{display:"none"}} className="form-control" id="cardId"
                                                       value={this.state.cardId} onChange={this._cardIdChange.bind(this)}/>
                                            </div>
                                        </div>
                                        <div className="form-group" style={{marginLeft:"5px"}}>
                                            <label className="col-sm-4 control-label">电话：</label>
                                            <div className="col-sm-5">
                                                <div className="userInfo" id="phoneArea">
                                                    {this.state.phone}
                                                    <span  className="glyphicon glyphicon-edit"
                                                           onClick={this._editOnClick("phone")}/>
                                                </div>
                                                <input type="text" style={{display:"none"}} className="form-control changedItem" id="phone"
                                                       value={this.state.phone} onChange={this._phoneChange.bind(this)}/>
                                            </div>
                                        </div>
                                        <div className="form-group" style={{marginLeft:"5px"}}>
                                            <label className="col-sm-4 control-label">邮箱：</label>
                                            <div className="col-sm-5">
                                                <div className="userInfo" id="emailArea">
                                                    {this.state.email}
                                                    <span  className="glyphicon glyphicon-edit"
                                                           onClick={this._editOnClick("email")}/>
                                                </div>
                                                <input type="text" style={{display:"none"}} className="form-control changedItem" id="email"
                                                       value={this.state.email} onChange={this._emailChange.bind(this)}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 control-label">分院：</label>
                                            <div className="col-sm-2 userInfo">{this.state.branch}</div>
                                            <label className="col-sm-2 control-label" style={{width:"80px"}}>专业：</label>
                                            <div className="col-sm-2 userInfo">{this.state.major}</div>
                                            <label className="col-sm-2 control-label" style={{width:"80px"}}>班级：</label>
                                            <div className="col-sm-2 userInfo">{this.state.classroom}</div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-sm-2"></div>
                                            <div className="col-sm-7">
                                                <button type="button" className="btn btn-block btn-primary pull-right"
                                                onClick={this._updateUserInfo.bind(this)}>更新</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="collapse" id="userScore">
                                <div className="well">
                                    <table className="table ">
                                        <thead>
                                        <tr >
                                            <th>考试名称</th>
                                            <th className="text-center">成绩</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>2</td>
                                            <td className="text-center">3</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {this.props.children}
                    </div>
                </div>
            }

            <div>
                <div>
                    {this.state.uploadedImages}
                </div>
                <form  id="uploadImgForm">
                    <input type="file" id="uploadImgBtn" name="image" accept=".jpg,.jpeg,.png,.gif"
                           onChange={(e) => this._handleImageChange(e)} style={{display:"none"}}/>
                </form>
            </div>
        </div>;

    }

    _handleImageChange(event) {
        const file = event.target.files[0];
        var imgSize = file.size;
        if(imgSize>1024 * 1024 * 5){
            alert("您上传的文件过大，请重新选择图片。");
            return;
        }
        const formData = new FormData();
        formData.append('image', file);

        request.post('/api/uploaded-images')
            .send(formData)
            .end((err, res) => {
                if (err) return alert('uploading failed!');
                const uploadedImagePath = res.text;
                this.setState({
                    uploadedImages: uploadedImagePath
                });
                $("#headImg").attr("src", uploadedImagePath);
            })
    }
    _uploadImg(event){
        $("#uploadImgBtn").click()
    }
    _updateUserInfo(){
        var newHeadImg = this.state.uploadedImages != '' ? this.state.uploadedImages : this.state.headImg;
        request
            .put('/api/users')
            .send({
                userAccount: this.state.userAccount,
                nickname: this.state.nickname,
                headImg: newHeadImg,
                realName: this.state.realName,
                sex: this.state.sex,
                email: this.state.email,
                phone: this.state.phone
            })
            .end((err,res) => {
                if(res.statusCode === 200){
                     alert("更新成功");
                    $('.userInfo').show();
                    $('.changedItem').hide();
                    return this._showUserInfo();
                }else{
                    return alert("更新失败");
                }
            });
    }

    _showUserInfo(event) {
        $("#userScore").collapse('hide')
        request.get('/api/users')
            .query({userAccount: this.state.userAccount})
            .end((err, res) => {
                const {id, userAccount, nickname, headImg, realName, cardId, sex, email, phone, branch, major, grade, classroom, userType} = res.body;
                this.setState({id, userAccount, nickname, headImg, realName, cardId, sex, email, phone, branch, major, grade, classroom, userType});
            });
    }

    _editOnClick(id) {return () => {$("#"+id+"Area").hide();$("#"+id).show();};}

    _sexChange(event){

        var sex = this.state.sex;
        sex = sex === 0 ? 1 : 0;
        this.setState({sex:sex});

    }
    _userAccountChange(event){this.setState({userAccount:event.target.value});}
    _realNameChange(event){this.setState({realName:event.target.value});}
    _cardIdChange(event){this.setState({cardId:event.target.value});}
    _phoneChange(event){this.setState({phone:event.target.value});}
    _emailChange(event){this.setState({email:event.target.value});}
    _nicknameChange(event){this.setState({nickname:event.target.value});}
}




