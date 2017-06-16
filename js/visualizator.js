$(document).ready(function(){
    $("#bt_visualizator").click(function () {
        $("#aplication_web").empty();
	var document_type = $("#document_type").val();
	var document_id = $("#document_id").val();
	var url_ws = 'http://200.10.150.238:8080/get_analysts/'+document_type+"/"+document_id;
	$("body").addClass("loading");
	$.getJSON(url_ws, {})
       	  .done(function( data ) {
		if(data.status==200){
			html_file = data.result;
			$("#aplication_web").append(html_file);
			$("body").removeClass("loading");
		}else{
			alert( "error" );
			$("body").removeClass("loading");		
		}
	  })
	 .fail(function() {
	  	alert( "error" );
		$("body").removeClass("loading");
	 });
    });
});
function getContribution(id){
	var txt_ath = 'txt_'+id;
	var td_ath = 'td_'+id;
	$('*[id*='+txt_ath+']:visible').each(function() {
	    if($(this).hasClass('normal')){
		$(this).removeClass('normal')
		$(this).addClass(id);
	    }else{
		$(this).removeClass(id)
		$(this).addClass('normal');
	    }
	});
	$('*[id*='+td_ath+']:visible').each(function() {
	    if($(this).hasClass('normal')){
		$(this).removeClass('normal')
		$(this).addClass(id);
	    }else{
		$(this).removeClass(id)
		$(this).addClass('normal');
	    }
	});
	
}
