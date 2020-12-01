import { Pipe, PipeTransform, NgModule } from '@angular/core';

@Pipe({
    name: 'reverse',
    pure: false
})

export class ReversePipe implements PipeTransform {
    transform(value) {
        return value.slice().reverse();
    }
}


@NgModule({
    declarations: [ReversePipe],
    exports: [ReversePipe]
})
export class ReversePipesModule { }