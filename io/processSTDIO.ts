console.log(
  'Эхо сервер, напишите что-то, нажмите enter и сервер ответит той же строкой:\n'
)
process.stdin.on('data', (data) => {
  if (data.toString().length < 2) {
    process.stderr.write('Ничего не написали\n')
  } else {
    process.stdout.write(data.toString())
  }
})
