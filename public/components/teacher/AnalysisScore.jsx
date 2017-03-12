import React from 'react';
import {hashHistory} from 'react-router'
import request from 'superagent';
import {Button, Icon, Table, message, Modal} from 'antd';
import moment from 'moment';
const confirm = Modal.confirm;
var PieChart = require("react-chartjs").Pie;
var BarChart = require("react-chartjs").Bar;


export default class AnalysisScore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modelVisible: false,
            examLists: [],
            scores: [],
            examName: '',
            one: 0,
            two: 0,
            three: 0,
            four: 0,
            five: 0
        }
    }

    componentWillMount() {
        request
            .get('/api/personal')
            .end((err, res) => {
                if (err || res.statusCode === 401) {
                    alert('please login!');
                    return hashHistory.push('/');
                }
                const {username, branch, major, classroom} = res.body;
                this.setState({username, branch, major, classroom});
                request.get("/api/exams/allExam")
                    .end((err, res) => {
                        const data = res.body.map(({_id, examName, publishDate, branch, major, classroom}) => {
                            return {_id, examName, publishDate: moment(publishDate).format('YYYY-MM-DD'), branch, major, classroom};
                        });
                        this.setState({
                            examLists: data
                        });
                    });
            });
    }

    paperhandleCancel(e) {
        this.setState({modelVisible: false});
    }

    paperhandleOk(e) {
        this.setState({modelVisible: false});
    }

    render() {
        var pdata = [
            {label: "60分以下", value: this.state.one, color: "#F38630"},
            {label: "60-70分", value: this.state.two, color: "#E0E4CC"},
            {label: "70-80分", value: this.state.three, color: "#69D2E7"},
            {label: "80-90分", value: this.state.four, color: "#0ae78c"},
            {label: "90分以上", value: this.state.five, color: "#dfe713"}
        ]
        const examColumns = [{
            title: '考试名称',
            dataIndex: 'examName',
            key: 'examName',
            width: '40%'
        }, {
            title: '发布时间',
            dataIndex: 'publishDate',
            key: 'publishDate',
            width: '10%'
        }, {
            title: '分院',
            dataIndex: 'branch',
            key: 'branch',
            width: '10%'
        }, {
            title: '专业',
            dataIndex: 'major',
            key: 'major',
            width: '10%'
        }, {
            title: '班级',
            dataIndex: 'classroom',
            key: 'classroom',
            width: '10%'
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>

      <span className="ant-divider"/>
      <a onClick={this._showPaperModel(record).bind(this)}>分析</a>
      <span className="ant-divider"/>


    </span>
            ),
        }];
        var options = {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
        var data = {
            labels: ["60分以下", "60-70分", "70-80分", "80-90分", "90分以上"],
            datasets: [
                {
                    fillColor: "#108ee9",
                    strokeColor: "rgba(220,220,220,1)",
                    data: [this.state.one, this.state.two, this.state.three, this.state.four, this.state.five],
                }
                // , {
                //     fillColor: "rgba(151,187,205,0.5)",
                //     strokeColor: "rgba(151,187,205,1)",
                //     data: [0,0,0,0,0]
                // }
            ]
        };
        return (<div>
            <Table rowKey={this.state.examLists._id} columns={examColumns} dataSource={this.state.examLists}
                   pagination={{defaultCurrent: 1, pageSize: 5}}/>
            <h4>分析图：</h4>
            <BarChart data={data} options={options} width="600" height="250"/>
            <PieChart data={pdata}/>
            <Modal title={this.state.examName} visible={this.state.modelVisible} width="80%"
                   onOk={this.paperhandleOk.bind(this)} onCancel={this.paperhandleCancel.bind(this)}>
                <div>
                    {this.state.one}
                    {this.state.two}
                    {this.state.three}
                    {this.state.four}
                    {this.state.five}

                </div>
            </Modal>
        </div>);
    }

    _showPaperModel(exam) {
        return () => {
            this.setState({
                one: 0,
                two: 0,
                three: 0,
                four: 0,
                five: 0
            });
            request
                .get('/api/score/examScore')
                .query({examId: exam._id})
                .end((err, res) => {
                    if (res.statusCode === 200) {
                        message.success("success");
                        console.log(res.body);
                        this.setState({
                            // modelVisible: true,
                            examName: exam.examName,
                            scores: res.body
                        });

                        const scores = res.body;

                        scores.map((item) => {
                            if (item.score < 60) {
                                this.setState({
                                    one: (++this.state.one)
                                });
                            } else if (item.score >= 60 && item.score < 70) {
                                this.setState({
                                    two: (++this.state.two)
                                });
                            } else if (item.score >= 70 && item.score < 80) {
                                this.setState({
                                    three: (++this.state.three)
                                });
                            } else if (item.score >= 80 && item.score < 90) {
                                this.setState({
                                    four: (++this.state.four)
                                });
                            } else if (item.score >= 90) {
                                this.setState({
                                    five: (++this.state.five)
                                });
                            }
                        });
                    } else {
                        message.error("操作失败");
                    }
                });
        }
    }
}