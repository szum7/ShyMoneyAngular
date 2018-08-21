// Services
import { SumService } from '../../../services/index';

// Models
import { SumModel } from './../../../global/summodel';
import { SumsOnDay } from './../../../global/sumsonday';

export class Control {

    constructor(
        private sumService: SumService) {
    }

    public add(day: SumsOnDay): void {
        console.log(day);
        if (day.Data) {
            let newSum: SumModel = new SumModel();
            newSum.Init();
            newSum.InputDate = day.Date;
            newSum.DueDate = day.Date;
            newSum.AccountDate = day.Date;
            day.Data.push(newSum);
        }
    }

    public save(sum: SumModel): void {
        this.sumService.save(sum).subscribe(function (response) {
            sum.Id = response.Id;
        });
    }

    public delete(day: SumsOnDay, index: number, id: number): void {
        if (id >= 0) {
            this.sumService.delete(id).subscribe(function (response) {
                if (response) {
                    day.Data.splice(index, 1);
                }
            });
        } else {
            day.Data.splice(index, 1);
        }
    }
}