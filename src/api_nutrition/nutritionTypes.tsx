const nutritionTypes = () => {
	interface NutritionalInfo {
		Name: string;
		Weight: {
			Value: number;
			Unit: 'g';
		};
		Energy: {
			Value: number;
			Unit: string;
		};
		Fat: {
			Value: number;
			Unit: string;
		};
		SaturatedFat: {
			Value: number;
			Unit: string;
		};
		Carbohydrates: {
			Value: number;
			Unit: string;
		};
		Sugars: {
			Value: number;
			Unit: string;
		};
		Fiber: {
			Value: number;
			Unit: string;
		};
		Protein: {
			Value: number;
			Unit: string;
		};
		Salt: {
			Value: number;
			Unit: string;
		};
		Cholesterol: {
			Value: number;
			Unit: string;
		};
		Sodium: {
			Value: number;
			Unit: string;
		};
		Potassium: {
			Value: number;
			Unit: string;
		};
	}
};

export default nutritionTypes;
