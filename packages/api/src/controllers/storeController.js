/*
 *  Copyright 2019, 2020, 2021, 2022, 2023 LiteFarm.org
 *  This file is part of LiteFarm.
 *
 *  LiteFarm is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  LiteFarm is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details, see <https://www.gnu.org/licenses/>.
 */

import axios from 'axios'
import * as crypto from 'crypto'

const storeController = {
  getHeader() {
    const { STORE_API_KEY, STORE_SECRET_KEY } = process.env
    const timeStamp = new Date().getTime()
    const data = `${STORE_API_KEY}${timeStamp}`
    const hash = crypto
      .createHmac('sha256', STORE_SECRET_KEY)
      .update(data)
      .digest('hex');
    return {
      headers : {
        'PX-API-KEY' : STORE_API_KEY,
        'PX-TIME' : timeStamp,
        'PX-SIGN' : hash,
      },
    }
  },
  searchFood() {
    return async (req, res) => {
      try {
        const { query } = req.query
        const { SEARCH_FOOD_URL } = process.env
        const response = await axios.get(`${SEARCH_FOOD_URL}?query=${query}`, this.getHeader())
        console.log('response recvd', response)
        res.status(201).send(response?.data)
      } catch (error) {
        console.log(error)
        res.status(400).json(error)
      }
    }
  },
  getStoreDetails() {
    return async (req, res) => {
      try {
        const { farm_id } = req.params
        const { STORE_CHECK_URL } = process.env
        console.log('about to hit with ', this.getHeader())
        const response = await axios.get(`${STORE_CHECK_URL}/${farm_id}`, this.getHeader())
        console.log('response recvd', response)
        res.status(201).send(response?.data)
      } catch (error) {
        console.log(error)
        res.status(400).json(error)
      }
    }
  },
  getProductDetails() {
    return async (req, res) => {
      try {
        const { farm_id } = req.params
        const { STORE_PRODUCT_CHECK_URL } = process.env
        const response = await axios.get(`${STORE_PRODUCT_CHECK_URL}/${farm_id}`, this.getHeader())
        console.log('response recvd', response)
        res.status(201).send(response?.data)
      } catch (error) {
        console.log(error)
        res.status(400).json(error)
      }
    }
  },
  createStripe() {
    return async (req, res) => {
      try {
        const { STRIPE_CREATE_URL } = process.env
        const response = await axios.post(`${STRIPE_CREATE_URL}`, req.body, this.getHeader())
        console.log('response recvd', response)
        res.status(201).send(response?.data)
      } catch (error) {
        console.log(error)
        res.status(400).json(error)
      }
    }
  },
  createProduct() {
    return async (req, res) => {
      try {
        const { STORE_PRODUCT_SAVE_URL } = process.env
        const response = await axios.post(`${STORE_PRODUCT_SAVE_URL}`, req.body, this.getHeader())
        console.log('response recvd', response)
        res.status(201).send(response?.data)
      } catch (error) {
        console.log(error)
        res.status(400).json(error)
      }
    }
  },
  updateProduct() {
    return async (req, res) => {
      try {
        const { STORE_PRODUCT_UPDATE_URL } = process.env
        const response = await axios.post(`${STORE_PRODUCT_UPDATE_URL}`, req.body, this.getHeader())
        console.log('response recvd', response)
        res.status(201).send(response?.data)
      } catch (error) {
        console.log(error)
        res.status(400).json(error)
      }
    }
  },
  viewStripe() {
    return async (req, res) => {
      try {
        const { phone_number } = req.params
        const { STRIPE_CREATE_URL } = process.env
        const response = await axios.get(`${STRIPE_CREATE_URL}/view/${phone_number}`, this.getHeader())
        console.log('response recvd', response)
        res.status(201).send(response?.data)
      } catch (error) {
        console.log(error)
        res.status(400).json(error)
      }
    }
  },
  checkStripe() {
    return async (req, res) => {
      try {
        const { phone_number } = req.params
        const { STRIPE_CHECK_URL } = process.env
        const response = await axios.get(`${STRIPE_CHECK_URL}/${phone_number}`, this.getHeader())
        console.log('response recvd', response)
        res.status(201).send(response?.data)
      } catch (error) {
        console.log(error)
        res.status(400).json(error)
      }
    }
  },
  addStoreDetails() {
    return async (req, res) => {
      try {
        const { STORE_SAVE_URL } = process.env
        const response = await axios.post(`${STORE_SAVE_URL}`, req.body, this.getHeader())
        console.log('response recvd', response)
        res.status(201).send(response?.data)
      } catch (error) {
        console.log(error)
        res.status(400).json(error)
      }
    }
  },
}

export default storeController
