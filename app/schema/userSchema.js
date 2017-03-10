import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id:Number,//编号
    userAccount: String,//用户名
    nickname: String,//昵称
    headImg: String,//用户头像
    password: String,//密码
    realName: String,//真实姓名
    cardId: String,//学号
    sex: Number,//性别
    email: String,//邮箱
    phone: String,//电话
    branch: String,//分院
    major: String,//专业
    grade:Number,//年级
    classroom: String,//班级
    userType: Number//用户类型，0：学生；1：教师
});

const User = mongoose.model('User', userSchema);

export {
    User,
};