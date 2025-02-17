import pandas as pd
from sklearn.base import BaseEstimator, TransformerMixin

class FeatureEngineer(BaseEstimator, TransformerMixin):
    def __init__(self):
        self.feature_names = []
        
    def fit(self, X, y=None):
        return self
        
    def transform(self, X):
        # Create debt-to-income ratio
        X['debt_to_income'] = X['monthly_expenses'] / (X['annual_income'] / 12)
        
        # Create credit utilization feature
        X['credit_utilization'] = X['loan_amount'] / (X['annual_income'] / 3)
        
        self.feature_names = X.columns.tolist()
        return X
    
    def get_feature_names(self):
        return self.feature_names 