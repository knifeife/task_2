window.onload=function(){
	var tree=document.getElementById("tree");
	var search=document.getElementById("search");
	var search_btn=search.getElementsByClassName("search")[0];


    init();

    // 搜索文件
    search_btn.onclick=function(){
    	var search_value=search.getElementsByTagName("input")[0].value;
    	var nodes=tree.getElementsByClassName("t-text");
    	var sum=0;
    	for(var i=0,len=nodes.length;i<len;i++){
    		if(trim(nodes[i].innerText)==search_value||trim(nodes[i].innerText).indexOf(search_value)+1){
    			var node_root=find_ancestor("tree",nodes[i]);
    			if(node_root.style.display=="none"){
    				node_root.style.display="block";
    			}
    			nodes[i].style.color="#ba2812";
    			sum++;
    		}
    	}
    	alert("总共找到\""+sum+"\"个含有\""+search_value+"\"的文件夹");
    }

    
	// 树形目录点击事件的委托
	tree.onclick=function(event){
        var e=event||window.event;
        var target=e.target||e.srcElement;
        var node=find_ancestor("title",target);
        switch(target.className){
        	case "add":
        	    add_node(node);
        	    break;
        	case "del":
        	    del_node(node);
        	    break;
        	case "refresh":
        	    refresh_node(node);
        	    break;
        	default:
        	    toggle_fold(node);   	    
        }
	}

    // 目录的展开与折叠
    function toggle_fold(node){
    	 if(node)
        {
            var span=node.getElementsByTagName("span");
            list=node.nextElementSibling;
            if(span[0].className=="fold"){
            	span[0].className="unfold";
            	if(list){
            		list.style.display="none";
            	}
            }
            else if(span[0].className=="unfold"){
            	span[0].className="fold";
            	if(list){
            		list.style.display="block";
            	}
            }
        }
    }

    // 增加结点
    function add_node(node){
    	var text=prompt("请输入要插入的子节点的内容：");
    	var list=node.nextElementSibling;
    	if(list){
    		var newNode=document.createElement("li");
    		newNode.innerHTML='<div class="title">'+
							  '<span class="fold"></span>'+
							  '<span class="t-text">'+text+'</span>'+
						      '<div class="btns">'+
						      '<span class="add">增加 </span>'+
						      '<span class="del">删除 </span>'+
						      '<span class="refresh">重命名</span>'+
						      '</div>'+
							  '</div>';
			list.appendChild(newNode);
			init();
			if(list.style.display=="none"){
            		list.style.display="block";
            }
    	}
    	else{
    		var newNode=document.createElement("ul");
    		newNode.className="tree"
    		newNode.innerHTML='<li>'+
							  '<div class="title">'+
							  '<span class="fold"></span>'+
							  '<span class="t-text">'+text+'</span>'+
						      '<div class="btns">'+
						      '<span class="add">增加 </span>'+
						      '<span class="del">删除 </span>'+
						      '<span class="refresh">重命名</span>'+
						      '</div>'+
							  '</div>'+
							  '</li>';
			node.parentNode.appendChild(newNode);
			init();
	    }
    }

    // 删除结点
    function del_node(node){
    	var statu=confirm("你确定要删除此节点吗？");
    	if(statu){
    		node.parentNode.removeChild(node);
    	}
    }

    // 重命名文件夹
    function refresh_node(node){
    	var new_file_name=prompt("重命名为：");
    	var text_node=node.getElementsByClassName("t-text")[0];
    	text_node.innerText=new_file_name;
    }

	// 寻找当前节点的最近的某个类名为refNode_className的祖先结点
	function find_ancestor(refNode_className,node){
		do{
			if(node.className==refNode_className||node.className.indexOf(refNode_className)+1){
				return node;
		    }
		    node=node.parentNode;
		}while(node);
	}

	// 初始化树形组件的icon图标
	function init(){
		var node=document.getElementsByClassName("title");
		for(var i=0; i<node.length;i++){
			var span=node[i].getElementsByTagName("span")[0];
			if(node[i].nextElementSibling){
				if(node[i].nextElementSibling.style.display=="block"){
					span.className="fold";
				}
				else if(node[i].nextElementSibling.style.display=="none"){
					span.className="unfold";
				}
			}
			else{
				span.className="";
			}
		}
	}

	// 去空格函数
	function trim(str){
		var newStr=str.replace(/(^\s*)|(\s*$)/g, "");
		return newStr;
	}

// 判断浏览器是否存在getElementsByClassName方法，若没有，则用js模拟
		if(!document.getElementsByClassName){
			document.getElementsByClassName=function(cls){
	            var ret=[];
	            var els=document.getElementsByTagName("*");

	            for(var i=0,len=els.length;i<len;i++){
	            	if(els[i].className===cls||els[i].className.indexOf(cls)+1){
	            		ret.push(els[i]);
	            	}
	            }
	            return ret;
			};
		}
}