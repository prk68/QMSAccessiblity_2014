var defaultProcedureService = angular.module('defaultProcedureServiceModule', [])

defaultProcedureService.factory('procedureDefaultInitializer', function(){
	
	var procedure = {}
	
	procedure.pid='G1000xxx..'
	procedure.trashed=false

		instance = {}
		
		instance.pname = "SIS QMS Procedure Name..."
		instance.owner = '' 
		instance.reviewer = 'SNagalur'
		instance.nversion = 1.0
		instance.date_of_modification = new Date()
		console.log(instance.date_of_modification.valueOf())
		instance.comments = ""
		
		instance.role = {}
		instance.role.pfl = false
		instance.role.eng = false
		instance.role.cmz = false
		instance.role.ops = false
		instance.role.sup = false
		instance.role.qlty = false
		
		instance.phase = {}
		instance.phase.incp = false
		instance.phase.elab = false
		instance.phase.constr = false
		instance.phase.beta = false
		instance.phase.cmz = false
		
		instance.questions = ["How do I do xxx..", "How do I yyy..", "How do I zzz.."]

		instance.global = true
		instance.local = false
		instance.center = {}
		instance.center.abtc = false;
		instance.center.atc = false;
		instance.center.brgc = false;
		instance.center.htc = false;
		instance.center.mptc = false;
		instance.center.ntc = false;
		instance.center.ptc = false;
		
			
		instance.content = ""
		

	procedure.versions = [];
	procedure.baseline = 0;
	procedure.versions.push(instance);

	return procedure;
	
});
	
	
	