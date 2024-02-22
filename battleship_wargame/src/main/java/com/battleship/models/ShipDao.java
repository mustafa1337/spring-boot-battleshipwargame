package com.battleship.models;

public class ShipDao implements Comparable<ShipDao> {
	String name;
	Integer length;
	Integer startindex;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getLength() {
		return length;
	}

	public void setLength(Integer length) {
		this.length = length;
	}

	public Integer getStartindex() {
		return startindex;
	}

	public void setStartindex(Integer startindex) {
		this.startindex = startindex;
	}

	@Override
	public int compareTo(ShipDao o) {
		// TODO Auto-generated method stub
		if (this.name.equalsIgnoreCase(o.getName()))
			return 0;
		return this.name.compareTo(o.getName());
	}

	@Override
	public boolean equals(Object obj) {
		// TODO Auto-generated method stub
		ShipDao second = (ShipDao) obj;
		return this.name.equalsIgnoreCase(second.getName());
	}

	@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		return this.name.hashCode();
	}

}
