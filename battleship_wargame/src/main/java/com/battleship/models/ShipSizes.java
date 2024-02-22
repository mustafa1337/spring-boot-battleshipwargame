package com.battleship.models;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public class ShipSizes {

	private Map<String, Integer> shipSizes = new HashMap<>();

	public ShipSizes() {
		this.shipSizes.put("destroyer", 2);
		this.shipSizes.put("submrine", 3);
		this.shipSizes.put("cruiser", 3);
		this.shipSizes.put("battleship", 4);
		this.shipSizes.put("carrier", 5);
	}

	public Map<String, Integer> getShipSizes() {
		return shipSizes;
	}

	public void setShipSizes(Map<String, Integer> shipSizes) {
		this.shipSizes = shipSizes;
	}

}
