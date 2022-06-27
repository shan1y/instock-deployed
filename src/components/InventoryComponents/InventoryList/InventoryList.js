import "./InventoryList.scss";
import chevron from "../../../assets/Icons/chevron_right-24px.svg";
import sortIcon from "../../../assets/Icons/sort-24px.svg";
import { Link } from "react-router-dom";

import DeleteModal from "../../DeleteModal/DeleteModal";

function InventoryList({
  inventoryList,
  updateStatus,
  statusStyle,
  openModal,
  closeModal,
  deleteItem,
  activeInventoryId,
  isOpen,
}) {
  let modalData = inventoryList.find((inventory) => {
    return activeInventoryId === inventory.id;
  });

  return (
    <>
      {isOpen && (
        <DeleteModal
          title={`Delete ${modalData.itemName} inventory item?`}
          paragraph={`Please confirm that you'd like to delete ${modalData.itemName} from the inventory list. You won't be able to undo this action.`}
          deleteItem={deleteItem}
          closeModal={closeModal}
          isOpen={isOpen}
          warehouseName={modalData.name}
          id={activeInventoryId}
        />
      )}
      <div>
        <div className="InventoryFilter">
          <ul className="InventoryFilter__content-list">
            <ul className="InventoryFilter__sub-list InventoryFilter__sub-list--margin1">
              <li className="InventoryFilter__list-details InventoryFilter__list-details--margin1">
                <div className="InventoryFilter__text-item InventoryFilter__text-item--margin">
                  <div className="InventoryFilter__text">Inventory Item</div>
                  <button className="InventoryFilter__button"></button>
                </div>
              </li>
              <li className="InventoryFilter__list-details InventoryFilter__list-details--margin2">
                <p className="InventoryFilter__text">Category</p>
                <button className="InventoryFilter__button"></button>
              </li>
            </ul>
            <ul className="InventoryFilter__sub-list InventoryFilter__sub-list--margin2">
              <li className="InventoryFilter__list-details InventoryFilter__list-details--margin3">
                <p className="InventoryFilter__text InventoryFilter__text--margin">
                  Status
                </p>
                <button className="InventoryFilter__button"></button>
              </li>
              <li className="InventoryFilter__list-details InventoryCard__list-details--margin4">
                <p className="InventoryFilter__text">Qty</p>
                <button className="InventoryFilter__button"></button>
              </li>
              <li className="InventoryFilter__list-details InventoryFilter__list-details--margin4">
                <p className="InventoryFilter__text">Warehouse</p>
                <button className="InventoryFilter__button"></button>
              </li>
            </ul>
          </ul>
          <div className="InventoryCard__buttons">
            <p className="InventoryFilter__text">Actions</p>
            <button className="InventoryFilter__button"></button>
          </div>
        </div>
        {inventoryList.map((item) => {
          return (
            <div className="InventoryCard" key={item.id}>
              <ul className="InventoryCard__content-list">
                <ul className="InventoryCard__sub-list InventoryCard__sub-list--margin1">
                  <li className="InventoryCard__list-details InventoryCard__list-details--margin1">
                    <h4 className="InventoryCard__list-title">
                      Inventory Item
                    </h4>
                    <Link to={`/inventory/${item.id}`}>
                      <div className="InventoryCard__link-item InventoryCard__link-item--margin">
                        <div className="InventoryCard__link body-medium">
                          {item.itemName}
                        </div>
                        <img
                          src={chevron}
                          alt="chevron linking to inventory item"
                        />
                      </div>
                    </Link>
                  </li>
                  <li className="InventoryCard__list-details InventoryCard__list-details--margin2">
                    <h4 className="InventoryCard__list-title">Category</h4>
                    <p className="InventoryCard__info body-medium">
                      {item.category}
                    </p>
                  </li>
                </ul>
                <ul className="InventoryCard__sub-list InventoryCard__sub-list--margin2">
                  <li className="InventoryCard__list-details InventoryCard__list-details--margin3">
                    <h4 className="InventoryCard__list-title">Status</h4>
                    <p
                      className={`InventoryCard__info body-medium ${statusStyle(
                        item.quantity
                      )}`}
                    >
                      {updateStatus(item.quantity)}
                    </p>
                  </li>
                  <li className="InventoryCard__list-details InventoryCard__list-details--margin4">
                    <h4 className="InventoryCard__list-title">Qty</h4>
                    <p className="InventoryCard__info body-medium">
                      {item.quantity}
                    </p>
                  </li>
                  <li className="InventoryCard__list-details InventoryCard__list-details--margin4">
                    <h4 className="InventoryCard__list-title">Warehouse</h4>
                    <p className="InventoryCard__info body-medium">
                      {item.warehouseName}
                    </p>
                  </li>
                </ul>
              </ul>
              <div className="InventoryCard__buttons">
                <button
                  onClick={() => {
                    openModal(item.id);
                  }}
                  type="button"
                  className="InventoryCard__button--delete"
                ></button>
                <Link to={`/inventory/edit/${item.id}`}>
                  <div className="InventoryCard__button--edit"></div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default InventoryList;
