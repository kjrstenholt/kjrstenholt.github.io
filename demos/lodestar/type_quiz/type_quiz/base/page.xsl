<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns="http://www.w3.org/TR/xhtml1/strict">
  <xsl:output
   method="html"
   indent="yes"
   encoding="UTF-8"
   doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN"
/>
  <xsl:template match="interactions/interaction/parameters/cparameter">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>
					<xsl:call-template name="getPageTitle">
						<xsl:with-param name="text" select="."/>
					</xsl:call-template>
				</title>
        <link rel="stylesheet" href="base/lesson.css" type="text/css"/>
      </head>
      <body>
        <p>
          <a name="top"/>
        </p>
        <xsl:call-template name="buildTOC"/>
        <xsl:call-template name="buildContentArea"/>
      </body>
    </html>
  </xsl:template>
  <xsl:template name="buildTOC">
    <div id="navColumn">
      <div class="title">Sections</div>
      <ul>
        <xsl:for-each select="optionpage">
          <xsl:for-each select="entrydata">
            <xsl:if test="input/@optionStore='TextArea_1'">
              <xsl:variable name="content">
                <xsl:value-of select="normalize-space(.)"/>
              </xsl:variable>
              <li>
                <xsl:element name="a">
                  <xsl:attribute name="href">
                    <xsl:value-of select="concat('#',$content)"/>
                  </xsl:attribute>
                  <xsl:value-of select="$content"/>
                </xsl:element>
              </li>
            </xsl:if>
          </xsl:for-each>
        </xsl:for-each>
        <li>
          <a href="#top">^Top of Page</a>
        </li>
      </ul>
      <div id="iconGroup">
        <a href="print.htm" target="_self">
          <img src="theme/print.png" width="32" height="32" border="0" alt="Click to view print optimized content."/>
        </a>
        <a href="sec508.htm" target="_self">
          <img src="theme/accessibility.png" width="32" height="32" border="0" alt="Click to view accessability optimized content."/>
        </a>
      </div>
    </div>
    <div/>
  </xsl:template>
  <xsl:template name="buildContentArea">
  
  
    <div id="pageBanner"/>
    <div id="contentColumn">
      <xsl:for-each select="optionpage">
        <xsl:for-each select="entrydata">
          <xsl:if test="input/@optionStore='TextArea_1'">
            <xsl:variable name="content">
              <xsl:value-of select="normalize-space(.)"/>
            </xsl:variable>
            <xsl:call-template name="buildContent">
              <xsl:with-param name="section" select="$content"/>
            </xsl:call-template>
          </xsl:if>
        </xsl:for-each>
      </xsl:for-each>
    </div>
  </xsl:template>
  <xsl:template name="buildContent">
    <xsl:param name="section"/>
    <xsl:for-each select="../entrydata">
      <xsl:if test="input/@optionStore='HTMLTextArea_1'">
        <xsl:variable name="content">
          <xsl:value-of select="."/>
        </xsl:variable>
         <xsl:element name="a">
            <xsl:attribute name="name">
              <xsl:value-of select="normalize-space($section)"/>
            </xsl:attribute>

          </xsl:element>
          <xsl:variable name="sectionCounter">
				<xsl:value-of select="position()"/>
		  </xsl:variable>
		  
		
  
  
  
  
  
  
  
  
			
			
			
			
			
        <h2>
          <xsl:value-of select="normalize-space($section)"/>
        </h2>
        <xsl:variable name="singleQuote">
          <xsl:text>'</xsl:text>
        </xsl:variable>
        <xsl:variable name="parsedContent">
          <xsl:call-template name="string-replace-all">
            <xsl:with-param name="text" select="$content"/>
            <xsl:with-param name="replace" select="concat('size=',$singleQuote)"/>
            <xsl:with-param name="by" select="concat('class=',concat($singleQuote,'f'))"/>
          </xsl:call-template>
        </xsl:variable>
        <xsl:value-of select="$parsedContent" disable-output-escaping="yes"/>
      </xsl:if>
    </xsl:for-each>
  </xsl:template>
  <!-- 	@param text         : main string
		@param replace : the string fragment to be replaced
		@param by           :  the replacement string
-->
  <xsl:template name="string-replace-all">
    <xsl:param name="text"/>
    <xsl:param name="replace"/>
    <xsl:param name="by"/>
    <xsl:choose>
      <xsl:when test="contains($text, $replace)">
        <xsl:value-of select="substring-before($text,$replace)"/>
        <xsl:value-of select="$by"/>
        <xsl:call-template name="string-replace-all">
          <xsl:with-param name="text"
          select="substring-after($text,$replace)" />
          <xsl:with-param name="replace" select="$replace"/>
          <xsl:with-param name="by" select="$by"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$text"/>
      </xsl:otherwise>
    </xsl:choose>
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
</xsl:stylesheet>




