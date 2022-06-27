import React from "react";
import "./WarehouseList.scss";
import chevron from "../../../assets/Icons/chevron_right-24px.svg";
import DeleteModal from "../../DeleteModal/DeleteModal";
import axios from "axios";
import SearchHeader from "../../SearchHeader/SearchHeader";
import { Link } from "react-router-dom";

class WarehouseList extends React.Component {
  state = {
    warehouseList: [],
    isOpen: false,
    activeWarehouseId: null,
    warehouseContact: null,
  };

  componentDidMount() {
    axios
      .get("https://instock-brainstation.herokuapp.com/warehouse")
      .then((response) => {
        return response.data;
      })
      .then((warehouseData) => {
        this.setState({
          warehouseList: warehouseData,
          warehouseContact: warehouseData.contact,
        });
      });
  }

  openModal = (id) => {
    this.setState({ isOpen: true, activeWarehouseId: id });
  };

  closeModal = () => this.setState({ isOpen: false });

  deleteItem = (id) => {
    axios
      .delete(`https://instock-brainstation.herokuapp.com/warehouse/${id}`)
      .then((response) => {
        this.setState({ warehouseList: response.data, isOpen: false });
      });
  };

  render() {
    const activeWarehouseId = this.state.activeWarehouseId;
    let modalData = this.state.warehouseList.find((warehouse) => {
      return activeWarehouseId === warehouse.id;
    });

    if (this.state.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return (
      <>
        {this.state.isOpen && this.state.activeWarehouseId && (
          <DeleteModal
            deleteItem={this.deleteItem}
            closeModal={this.closeModal}
            title={`Delete ${modalData.name} Warehouse?`}
            paragraph={`Please confirm that you'd like to delete the ${modalData.name} warehouse from the warehouse list. You won't be able to undo this action.`}
            id={activeWarehouseId}
          />
        )}

        <SearchHeader
          title={"Warehouses"}
          urlPath={"/warehouse/add"}
          item={"Warehouse"}
        />

        <ul className="sorter">
          <li className="sorter__item sorter__item--warehouse">
            Warehouse <button className="sorter__button"></button>
          </li>
          <li className="sorter__item sorter__item--address">
            Address <button className="sorter__button"></button>
          </li>
          <li className="sorter__item sorter__item--contact-name">
            Contact Name<button className="sorter__button"></button>
          </li>
          <li className="sorter__item sorter__item--contact">
            Contact Information<button className="sorter__button"></button>
          </li>
          <li className="sorter__item">
            Actions<button className="sorter__button"></button>
          </li>
        </ul>
        {this.state.warehouseList.map((warehouse) => {
          return (
            <div key={warehouse.id}>
              <div className="warehouseCard">
                <ul className="warehouseCard__content-list">
                  <ul className="warehouseCard__sub-list">
                    <li className="warehouseCard__list-details">
                      <h4 className="warehouseCard__list-title">Warehouse</h4>

                      <Link to={`/warehouse/${warehouse.id}/inventory`}>
                        <div className="warehouseCard__link-item">
                          <div className="warehouseCard__link body-medium">
                            {warehouse.name}
                          </div>
                          <img src={chevron} alt="chevron icon" />
                        </div>
                      </Link>
                    </li>
                    <li className="warehouseCard__list-details">
                      <h4 className="warehouseCard__list-title">Address</h4>
                      <p className="warehouseCard__info body-medium">
                        {warehouse.address}
                      </p>
                      <p className="warehouseCard__info body-medium">
                        {warehouse.city}, {warehouse.country}
                      </p>
                    </li>
                  </ul>
                  <ul className="warehouseCard__sub-list">
                    <li className="warehouseCard__list-details">
                      <h4 className="warehouseCard__list-title">
                        Contact Name
                      </h4>
                      <p className="warehouseCard__info body-medium">
                        {warehouse.contact.name}
                      </p>
                    </li>
                    <li className="warehouseCard__list-details">
                      <h4 className="warehouseCard__list-title">
                        Contact Information
                      </h4>
                      <p className="warehouseCard__info body-medium">
                        {warehouse.contact.phone}
                      </p>
                      <p className="warehouseCard__info body-medium">
                        {warehouse.contact.email}
                      </p>
                    </li>
                  </ul>
                </ul>
                <div className="warehouseCard__buttons">
                  <button
                    onClick={() => {
                      this.openModal(warehouse.id);
                    }}
                    type="button"
                    className="warehouseCard__button--delete"
                  ></button>
                  <Link to={`/warehouse/${warehouse.id}/edit`}>
                    <div className="warehouseCard__button--edit"></div>
                  </Link>
                </div>
              </div>
              <div className="warehouseCard--tablet">
                <Link to={`/warehouse/${warehouse.id}/inventory`}>
                  <div className="warehouseCard__link--tablet body-medium">
                    {warehouse.name}
                    <img src={chevron} alt="chevron" />
                  </div>
                </Link>
                <p className="warehouseCard__address--tablet body-medium">
                  {warehouse.address}, {warehouse.city}, {warehouse.country}
                </p>

                <p className="warehouseCard__info--name body-medium">
                  {warehouse.contact.name}
                </p>
                <div>
                  <p className="warehouseCard__info--contact body-medium">
                    {warehouse.contact.phone}
                  </p>
                  <p className="warehouseCard__info--contact body-medium">
                    {warehouse.contact.email}
                  </p>
                </div>
                <div className="warehouseCard__buttons warehouseCard__buttons--tablet">
                  <button
                    onClick={() => {
                      this.openModal(warehouse.id);
                    }}
                    type="button"
                    className="warehouseCard__button--delete"
                  ></button>
                  <Link
                    to={`/warehouse/${warehouse.id}/edit`}
                    className="warehouseCard__button--edit"
                  ></Link>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}

export default WarehouseList;
