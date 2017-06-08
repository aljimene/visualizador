$(document).ready(function(){
    $("#bt_visualizator").click(function () {
        $("#ath_vs").empty();
        $("#txt_vs").empty();	
	var document_type = $("#document_type").val();
	var document_id = $("#document_id").val();
	var url_ws = 'http://localhost:8080/get_analysts/'+document_type+"/"+document_id;
	$("body").addClass("loading");
	$.getJSON(url_ws, {})
       	  .done(function( data ) {
		if(data.status==200){
			html_file = data.html;
			obj = $.parseJSON(data.data);
			authors = obj.authors;
			text_authors = obj.text_authors;
			text = obj.text;
			authors_html = "<table border='1'>";
			var hash_authors = {};
			$.each( authors, function( index ) {
			    //alert(this.text());
			    author = authors[index];
			    hash_authors[author[1]]=index;
			    prc = parseFloat(author[3])*100;
			    authors_html+="<tr><td class='normal' id='td_ath_" + index + "'><a onclick='getContribution(this.id)' id='ath_" + index + "'>" + author[1] + "</a></td><td>"+prc.toFixed(2)+"%</td></tr>";
			    
			});
			authors_html+="</table>";
			$("#ath_vs").append(authors_html);
			text_html = "";
			$.each( text, function( index ) {
				txt = text[index];
				if(txt=='enter'){
					text_html+="<br/>"				
				}else{
					text_html+="<span class='normal' id='txt_ath_"+hash_authors[text_authors[index]]+"'>"+txt+" </span>"				
				}
			});
			$("#txt_vs").append(html_file);
			$("#txt_sin_vs").append(text_html);
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
