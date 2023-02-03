let file = fs.readFile('tp.txt', (err, inputD) => {
   if (err) throw err;
      console.log(inputD.toString());
  })
  let fInput = file + " , " + downloadLink
  fs.writeFile('tp.txt', fInput, (err) => {
   if (err) throw err;
   else{
      console.log("The file is updated with the given data")
   }
  })