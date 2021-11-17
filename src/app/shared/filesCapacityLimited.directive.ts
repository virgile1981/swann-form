import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Config } from "../config";

export function filesCapacityLimited(): ValidatorFn {
    
    return (group: FormGroup): ValidationErrors | null => {
        let totalFilesSize = 0;
        for (const field in group.controls) { // 'field' is a string
            if(field.startsWith("images")) {
                const control = group.get(field); // 'control' is a FormControl 
                if(control.value)
                {
                    control.value.forEach(file => {
                    totalFilesSize += file.size; 
                    });
                    if(totalFilesSize > Config.filetoupload.maxsize ){
                        return {filesCapacityLimited: {value: "Config.filetoupload.maxsize"}};
                    }
                }
            }
          }
        return null;
      };
}   