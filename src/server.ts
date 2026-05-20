import { app, port } from "./app"
import { initDB } from "./database/db"


const main = () => {
  initDB()
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

main()