/**
 * @author monkeywang
 * Date: 17/3/27
 */
import Vue from 'vue'
import
{
  Button,
  Select,
  Option,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  InputNumber,
  Loading,
  Tree,
  Popover,
  Rate,
  Row,
  Col,
  Form,
  FormItem,
  Table,
  TableColumn,
  MessageBox,
  Message
} from 'element-ui'
let variable = {
  Button,
  Select,
  Option,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  InputNumber,
  Loading,
  Tree,
  Popover,
  Rate,
  Row,
  Col,
  Form,
  FormItem,
  Table,
  TableColumn,
  MessageBox,
  Message
}
for (let item in variable) {
  if (variable.hasOwnProperty(item)) {
    Vue.use(variable[item])
  }
}

export default Vue

