import { DTO } from "@typing/http";

abstract class Model {
	/**
	 * A model class needs to be used to unify the usage of classes that represent the
	 * business logic of the application. Following the arquitecture used, we always try
	 * to avoid bind params and naming especific declared in the another layers - but
	 * it's possible to create methods that can export the entity data based to the
	 * necessity, like a method that returns the essential data to be used to create
	 * or update an instance.
	 */

	// Constructs an object from a JSON.
	static fromJSON(_: DTO): Model {
		throw new Error("you need to implement the fromJSON method");
	}
}

export { Model };