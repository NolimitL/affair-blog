import { FormControl, ValidationErrors } from '@angular/forms';

const symbols = ['/','#','&','$','@','*','-','+','=','?','%']

export class CustomValidators{

  static notCorrectEmail(control: FormControl):ValidationErrors{
    if(control.value === null){
      return null
    }else{
      if(!control.value.trim().includes('.', control.value.indexOf('@'))){
        return {
          notCorrectEmail:true
        }
      }else{
        return null
      }
    }
  }

  static absenceSymbol(control: FormControl):ValidationErrors{
    if(control.value === null){
      return null
    }else{
      if (symbols.some(s => control.value.includes(s))) {
        return null
      } else {
        return{
          absenceSymbol:true
        }
      }
    }
  }


}
