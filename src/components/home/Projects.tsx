import { FC } from "react"
import ProductsList from "../projects/ProductsList"

interface ProjectsProps {}

const Projects: FC<ProjectsProps> = ({}) => {
  return (
    <div className="space-y-14">
      <ProductsList query={{ category: "Framer Templates" }} />
      <ProductsList query={{ category: "Background" }} />
      <ProductsList query={{ category: "Icons" }} />
    </div>
  )
}

export default Projects
