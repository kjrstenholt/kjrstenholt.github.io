
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/TR/xhtml1/strict">
	<xsl:output method="html" indent="yes" encoding="UTF-8"/>
	<xsl:template name="strip-HTML">
		<xsl:param name="text"/>
		<xsl:choose>
			<xsl:when test="contains($text, '&gt;')">
				<xsl:choose>
					<xsl:when test="contains($text, '&lt;')">
						<xsl:value-of select="concat(substring-before($text, '&lt;'), ' ')"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="substring-before($text, '&gt;')"/>
					</xsl:otherwise>
				</xsl:choose>
				<xsl:call-template name="strip-HTML">
					<xsl:with-param name="text" select="substring-after($text, '&gt;')"/>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$text"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="leave-HTML">
		<xsl:param name="text"/>
		<xsl:value-of select="$text"  disable-output-escaping="yes"/>
	</xsl:template>
	<xsl:template match="interactions/interaction/parameters/cparameter">
		<html>
			<head>
				<title>
					<xsl:call-template name="getPageTitle">
						<xsl:with-param name="text" select="."/>
					</xsl:call-template>
				</title>
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="viewport" content="width=device-width, initial-scale=.75, maximum-scale=.75, user-scalable=no" />
				<link rel="stylesheet" href="stylesheets/sec508_print_view.css" type="text/css" media="screen"/>
				<link rel="stylesheet" href="stylesheets/sec508_print.css" type="text/css" media="print"/>
			</head>
			<body>
				<div id="iconGroup">
					<a href="javascript:window.print()">
						<img src="theme/print.png" width="32" height="32" border="0" alt="Click to print."/>
					</a>
					<a href="index.htm" target="_self">
						<img src="theme/full_format.png" width="32" height="32" border="0" alt="Click to view dynamic layout."/>
					</a>
				</div>
				<xsl:for-each select="optionpage">
				
				<!-- if there is any text inside the accessibility element, then display and skip over the rest of this optionpage -->  
				
				<xsl:variable name="accessibilityText">
						<xsl:value-of select="entrydata/input[@type='JetOptionAccessibilitySelector']"/>
					</xsl:variable>
					
					<xsl:call-template name="leave-HTML">
												<xsl:with-param name="text" select="$accessibilityText"/>
											</xsl:call-template>
				
			    <xsl:if test="not(string($accessibilityText))">
				
				<xsl:choose>
								
								<xsl:when test="entrydata[position()=1]/input[position()=1] = 'Open Question Format'">
									<p>This section is purposely hidden.</p>
								</xsl:when>
							<xsl:otherwise>
					<xsl:variable name="sectionCounter">
						<xsl:value-of select="position()"/>
					</xsl:variable>
					<xsl:for-each select="entrydata">
						<xsl:if test="input/@optionStore='TextArea_1'">
							<xsl:choose>
								<xsl:when test="$sectionCounter = 1">
									<h1>
										<xsl:value-of select="input"/>
									</h1>
								</xsl:when>
								<xsl:otherwise>
									<h2>
										<xsl:value-of select="input"/>
									</h2>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:if>
						<xsl:if test="input/@type='JetOptionAdvancedHTMLEditor'">
							<p>
								
								
								<xsl:if test="(string(input))">
								<xsl:variable name="text">
									<xsl:value-of select="input"/>
								</xsl:variable>
								
								<xsl:variable name="strippedQuestionMarkup">
									 <xsl:call-template name="string-replace-all">
    									<xsl:with-param name="text" select="$text" />
    									<xsl:with-param name="replace" select="'*'" />
    									<xsl:with-param name="by" select="''" />
  										</xsl:call-template>

								</xsl:variable>
									
									<xsl:choose>
										<xsl:when test="contains($strippedQuestionMarkup, '&gt;')">
											<xsl:call-template name="leave-HTML">
												<xsl:with-param name="text" select="$strippedQuestionMarkup"/>
											</xsl:call-template>
										</xsl:when>
		
									</xsl:choose>
									
								</xsl:if>
							</p>
						</xsl:if>
						<xsl:if test="input/@type='JetOptionImageArea'">
							<xsl:if test="(string(imageCaption))">Image of
                <xsl:value-of select="imageCaption"/>
								<br/>
							</xsl:if>
							<xsl:if test="(string(imageSource))">
								<xsl:value-of select="imageSource"/>
								<br/>
							</xsl:if>
						</xsl:if>
						<xsl:if test="input/@optionStore='TextArea_2'">
							<xsl:if test="(string(input))">
								<br/>Question:
                <xsl:value-of select="input"/>
							</xsl:if>
						</xsl:if>
					</xsl:for-each>
					</xsl:otherwise>
					</xsl:choose>
					</xsl:if>
				</xsl:for-each>
			</body>
		</html>
	</xsl:template>
	<xsl:template name="getTitle">
		<xsl:param name="text"/>
		<xsl:variable name="sectionCounter">
			<xsl:value-of select="position()"/>
		</xsl:variable>
		<xsl:if test="input/@optionStore='TextArea_1'">
			<div class="header">
				<h1>
					<xsl:value-of select="normalize-space(.)" disable-output-escaping="yes"/>
				</h1>
			</div>
		</xsl:if>
	</xsl:template>
	<xsl:template name="getPageTitle">
		<xsl:param name="text"/>
		<xsl:for-each select="optionpage">
			<xsl:variable name="sectionCounter">
				<xsl:value-of select="position()"/>
			</xsl:variable>
			<xsl:for-each select="entrydata">
				<xsl:if test="input/@optionStore='TextArea_1'">
					<xsl:if test="$sectionCounter = 1">
						<xsl:value-of select="normalize-space(.)" disable-output-escaping="yes"/>
					</xsl:if>
				</xsl:if>
			</xsl:for-each>
		</xsl:for-each>
	</xsl:template>
	<xsl:template name="string-replace-all">
  <xsl:param name="text" />
  <xsl:param name="replace" />
  <xsl:param name="by" />
  <xsl:choose>
    <xsl:when test="contains($text, $replace)">
      <xsl:value-of select="substring-before($text,$replace)" />
      <xsl:value-of select="$by" />
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text"
        select="substring-after($text,$replace)" />
        <xsl:with-param name="replace" select="$replace" />
        <xsl:with-param name="by" select="$by" />
      </xsl:call-template>
    </xsl:when>
    <xsl:otherwise>
      <xsl:value-of select="$text" />
    </xsl:otherwise>
  </xsl:choose>
</xsl:template>
</xsl:stylesheet>
