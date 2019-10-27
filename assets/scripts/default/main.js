!(function(window) {
    window.show = function(obj){
        obj.setAttribute('show','');
        obj.removeAttribute('hide');
    };
    
    window.hide = function(obj){
        obj.setAttribute('hide','');
        obj.removeAttribute('show');
    };

    var dropMenu = {

        self : this.dropMenu,

        bind : function(){
            self.drop_objs = document.querySelectorAll("a[dropmanuid]");
            self.drop_obj = self.drop_objs.length > 0 ? self.drop_objs[0] : null;
            if(self.drop_obj != null){
                self.drop_obj.href="javascript:";
                self.drop_obj.addEventListener('click',this.toggle);
            }
        },
        toggle: function(){
            var item_id= self.drop_obj.getAttribute('dropmanuitem');
            if (item_id != null){
                var item = document.getElementById(item_id);
                if( item ){
                    var show = item.getAttribute('show');
                    if(show == null){
                        window.show(item); 
                        item.setAttribute('style','display: block');
                    }else{
                        window.hide(item);
                        item.setAttribute('style','display: none');
                    }
                }
            }
        }
    }

    // var dropSearch = {

    //     sf : this.dropSearch,

    //     bind : function(){
    //         sf.drop_objs = document.querySelectorAll("a[dropsearchid]");
    //         self.drop_obj = self.drop_objs.length > 0 ? self.drop_objs[0] : null;
    //         if(self.drop_obj != null){
    //             self.drop_obj.href="javascript:";
    //             self.drop_obj.addEventListener('click',this.toggle);
    //         }


    //         // if( self.drop_objs.length > 0){
    //         //     for(var i = 0; i < self.drop_objs.length; i++){
    //         //         self.drop_obj = self.drop_objs[i];
    //         //         if(self.drop_obj != null){
    //         //             self.drop_obj.href="javascript:";
    //         //             self.drop_obj.addEventListener('click',this.toggle);
    //         //         }
    //         //     }
    //         // }
    //     },
    //     toggle: function(){
    //         var item_id= self.drop_obj.getAttribute('dropsearchitem');
    //         if (item_id != null){
    //             var item = document.getElementById(item_id);
    //             if( item ){
    //                 var show = item.getAttribute('show');
    //                 if(show == null){
    //                     window.show(item); 
    //                     item.setAttribute('style','display: block');
    //                 }else{
    //                     window.hide(item);
    //                     item.setAttribute('style','display: none');
    //                 }
    //             }
    //         }
    //     }
    // }


    window.tools = {
        thousandBitSeparator : function(num){
            return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        }
    };

    window.onload = function(){
        dropMenu.bind();
        // dropSearch.bind();
    }

})(window);
