import React from 'react';
import {hashHistory} from 'react-router'

export default class DeleteAlert extends React.Component {
    render() {
        return (<div>
            <div className="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                <div className="modal-dialog modal-sm" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">提示信息</h4>
                            <div className="modal-body">
                                <p>确定删除？</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                                <button type="button" className="btn btn-danger">确定</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }

}