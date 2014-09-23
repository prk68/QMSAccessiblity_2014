var defaultProcedureService = angular.module('validateDraft', [])

defaultProcedureService.factory('validateDraft', function(){
	
	return {
            validateFields: function(procedure) {
            	errors = []
            	
                if(!procedure.pid)
					errors.push("Procedure Id is empty.")
				

				if(!procedure.pname)
					errors.push("Procedure name is empty.")
					

				if(!angular.isNumber(procedure.version))
					errors.push("Procedure version is not a valid number")				
				

				if(!procedure.data.content)
					errors.push("Procedure has no content. Cannot create such procedures.")
						

				return errors;
            }
        };
});
	
	
	