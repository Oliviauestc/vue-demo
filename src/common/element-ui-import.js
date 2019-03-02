/**
 * @author monkeywang
 * Date: 17/3/27
 */
import Vue from 'vue'
import
{
  Button,
  Select,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  Loading,
  Tree,
  Rate,
  Row,
  Col
} from 'element-ui'
let variable = {
  Button,
  Select,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  Loading,
  Tree,
  Rate,
  Row,
  Col
}
for (let item in variable) {
  if (variable.hasOwnProperty(item)) {
    Vue.use(variable[item])
  }
}

export default Vue

