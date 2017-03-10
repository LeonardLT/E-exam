import {IncId} from '../schema/ids';
export default function (next, cb) {
    IncId.findByIdAndUpdate({_id: 'incId'}, {$inc: {id: 1}}, function (err, id) {
        if (err) return next(err);
        cb(null, id.id);
    });
}