var defaultProcedureService = angular.module('defaultProcedureServiceModule', [])

defaultProcedureService.factory('procedureDefaultInitializer', function(){
	var procedure = {}
	
	procedure.pid='G1000xxx..'
	procedure.pname = 'SIS Quality Procedure..'
	
	procedure.owner_name = 'xxx....'
	procedure.nversion = 0.0
	procedure.date_of_modification = new Date()
	procedure.date_of_creation = new Date()
	procedure.comments = ""
	
	procedure.role = {}
	procedure.role.pfl = false
	procedure.role.eng = false
	procedure.role.cmz = false
	procedure.role.ops = false
	procedure.role.sup = false
	procedure.role.qlty = false
	
	procedure.phase = {}
	procedure.phase.incp = false
	procedure.phase.elab = false
	procedure.phase.constr = false
	procedure.phase.beta = false
	procedure.phase.cmz = false
	
	procedure.questions = ["How do I do xxx..", "How do I yyy..", "How do I zzz.."]

	procedure.global = true
	procedure.center = {}
	procedure.center.abtc = false;
	procedure.center.atc = false;
	procedure.center.brgc = false;
	procedure.center.htc = false;
	procedure.center.mptc = false;
	procedure.center.ntc = false;
	procedure.center.ptc = false;
	
		
	procedure.content = ""

	return procedure;
	
	});
	
	
	