const http=require('http');
const fs=require('fs');
const port=3000;

const server=http.createServer(function(req,res){
    
    res.writeHead('200',{'Content-Type':'text/html'});
    fs.readFile('./index.html',(err,data)=>{
        if(err){
            console.log(err)
        }
        else{

            res.write(data);

        }
        res.end()
    })

   
})

server.listen(port,()=>{
    console.log('listening')
})

