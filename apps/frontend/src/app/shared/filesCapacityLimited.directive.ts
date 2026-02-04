import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Config } from "../config";

export function filesCapacityLimited(): ValidatorFn {
    
    return (group: FormGroup): ValidationErrors | null => {
        let totalFilesSize = 0;
        let imageControls = [];
        let valueToReturn = null;
        for (const field in group.controls) { // 'field' is a string
            if(field.startsWith("images")) {
                
                const control = group.get(field); // 'control' is a FormControl 
                imageControls.push(control);
                if(control.value)
                {
                    control.value.forEach(file => {
                    totalFilesSize += file.size; 
                    });
                    if(totalFilesSize > Config.filetoupload.maxsize ){
                        valueToReturn= {filesCapacityLimited: {value: "Config.filetoupload.maxsize"}};
                        
                    }
                }
            }
          }
        
        if(imageControls) {
            imageControls.forEach(control => {
                if(!control.pristine){
                    control.setErrors(valueToReturn);
                }
            });
        }
          
        return valueToReturn;
      };
}   