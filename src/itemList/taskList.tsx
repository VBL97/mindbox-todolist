import { List } from "antd";
import { JSX, ReactNode } from "react";

import "./item-list.scss";

interface ItemListProps<T> {
  items: T[];
  renderFunc: (item: T) => React.ReactNode;
  emptyText?: ReactNode;
}

const ItemList = <T extends unknown>({
  items,
  renderFunc,
  emptyText,
}: ItemListProps<T>): JSX.Element => {
  return (
    <div className="items-list">
      <List
        locale={{ emptyText }}
        itemLayout="horizontal"
        dataSource={items}
        renderItem={renderFunc}
      />
    </div>
  );
};

export default ItemList;
