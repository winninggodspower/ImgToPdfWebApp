CREDIT_PER_DOLLAR = 100

# price should be in dollars
def determine_credits(price: int):
    non_discounted_credits = price * CREDIT_PER_DOLLAR
    
    if price >= 4:
        return non_discounted_credits - (non_discounted_credits * 0.2)
    
    elif price >= 2:
        return non_discounted_credits - (non_discounted_credits * 0.1)
    
    else:
        return non_discounted_credits