'use strict';

function model() {

    return {
        dbName:null,
        currentId:null,
        statusItem: "no-status",
        setDBName(key){
            if(!key.trim()) throw new Error('Man it is not Possible, db key required');

            this.dbName = key;

        },


        get data(){
            return JSON.parse(localStorage.getItem(this.dbName));
        },

        setData(data){
            let response = null;
            const savedData = this.data;
            const dataToSave = savedData ? savedData : [];

            data.id = this.currentId;

            data.status = this.statusItem;

            dataToSave.push(data);


            try{
                localStorage.setItem(this.dbName, JSON.stringify(dataToSave));
                response = { success: true, saveData:data }
                this.currentId += 1;
            }catch (error) {
                response = {success: false, errors:error}
            }

            return response;
        },

        deleteTodoItem(id){
            const data = this.data;

            const upData = data.filter(item => item.id !== id);

            if(upData.length){
                localStorage.setItem(this.dbName, JSON.stringify(upData));
            }else{
                localStorage.removeItem(this.dbName);
            }
        },

        updatedStatus(id, status){
            const data = this.data;

            for(let item of data){
                if(item.id !== id) return;
                item.status = status;
            }
            localStorage.setItem(this.dbName, JSON.stringify(data));
        },

        init(dbkey){
            this.setDBName(dbkey);

            const savedData = this.data;
            this.currentId = savedData ? savedData[savedData.length-1].id + 1 : 1;
        }

    }
}