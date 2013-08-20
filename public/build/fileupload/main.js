/*
 * jQuery File Upload Plugin JS Example 7.0
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

$(function(){$("#fileupload").fileupload({url:"/upload"}),$("#fileupload").fileupload("option","redirect",window.location.href.replace(/\/[^\/]*$/,"/cors/result.html?%s")),$("#fileupload").fileupload("option",{url:"/upload",maxFileSize:5e6,process:[{action:"load",fileTypes:/^image\/(gif|jpeg|png)$/,maxFileSize:2e7},{action:"resize",maxWidth:1440,maxHeight:900},{action:"save"}]}),$.support.cors&&$.ajax({url:"/upload",type:"HEAD"}).fail(function(){$('<span class="alert alert-error"/>').text("Upload server currently unavailable - "+new Date).appendTo("#fileupload")}),window.location.hostname!=="localhost"&&$.ajax({url:$("#fileupload").fileupload("option","url"),dataType:"json",context:$("#fileupload")[0]}).done(function(e){$(this).fileupload("option","done").call(this,null,{result:e})})});