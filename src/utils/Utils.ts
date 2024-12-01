export default class Utils {
    static getMaxId(arr: any[]): number{
        let max = 0

        for(const obj of arr){
            if(obj.id > max){
                max = obj.id
            }
        }

        return max
    }
}