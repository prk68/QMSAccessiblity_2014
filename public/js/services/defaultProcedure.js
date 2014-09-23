var defaultProcedureService = angular.module('defaultProcedureServiceModule', [])

defaultProcedureService.factory('emptyDraft', function($window){
	
	var procedure = {}
	
	procedure.pid=""
	procedure.pname = ""
	procedure.version = 1.0
	procedure.in_draft = true
	procedure.draft_type = "new"
	procedure.rejected = false
	procedure.rejections = []

	procedure.mappings = {}
	procedure.metaData = {}
	procedure.data = {}

	
	procedure.mappings.role = {}
	procedure.mappings.role.pfl = false
	procedure.mappings.role.eng = false
	procedure.mappings.role.cmz = false
	procedure.mappings.role.ops = false
	procedure.mappings.role.sup = false
	procedure.mappings.role.qlty = false
		
	procedure.mappings.phase = {}
	procedure.mappings.phase.incp = false
	procedure.mappings.phase.elab = false
	procedure.mappings.phase.constr = false
	procedure.mappings.phase.beta = false
	procedure.mappings.phase.cmz = false
		
	procedure.mappings.questions = ["How do I do", "How do I", "How do I"]

	procedure.mappings.center = {}
	procedure.mappings.center.abtc = false;
	procedure.mappings.center.atc = false;
	procedure.mappings.center.brgc = false;
	procedure.mappings.center.htc = false;
	procedure.mappings.center.mptc = false;
	procedure.mappings.center.ntc = false;
	procedure.mappings.center.ptc = false;
	procedure.mappings.global = true
		
	procedure.metaData.reviewer = 'Standish1'
	procedure.metaData.comments = ""


	procedure.data.content = ""
	
	return procedure;	
});
	
	
	